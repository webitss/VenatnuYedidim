using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Reflection;
using System.Web.Script.Serialization;
using Newtonsoft.Json;
using Service.Entities;

namespace Service.Utilities
{
    /// <summary>
    /// מעבר על כל המאפינים של אוביקט מסוים בצורה גנרית  
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public abstract class ObjectGenerator<T> where T : new()
    {
        public static T GeneratFromDataRow(DataRow dr)
        {
            T obj = new T();
            foreach (PropertyInfo property in obj.GetType().GetProperties())
            {
                if (dr.Table.Columns.Contains(property.Name))
                {
                    object cell = dr[property.Name];
                    if (cell != DBNull.Value)//&& !( Attribute.IsDefined(property, typeof(NoSendToSQL)) || Attribute.IsDefined(property, typeof(NoSQL)) )
                    {
                        Type t = Nullable.GetUnderlyingType(property.PropertyType) ?? property.PropertyType;
                        try
                        {
                            if (cell.GetType() == typeof(TimeSpan) && t == typeof(DateTime))
                            {
                                TimeSpan myTimeSpan = TimeSpan.Parse(cell.ToString());
                                property.SetValue(obj, new DateTime(myTimeSpan.Ticks), null);
                            }
                            else
                            {
                                property.SetValue(obj, Convert.ChangeType(cell, t), null);
                            }
                        }
                        catch (Exception ex)
                        {
                            //Error during convert
                        }
                    }
                }
            }
            return obj;
        }

        public static List<SqlParameter> GetSqlParametersFromObject(T obj)
        {
            List<SqlParameter> paremeters = new List<SqlParameter>();
            SqlParameter returnParam = new SqlParameter("@RETURN_VALUE", SqlDbType.Int);
            returnParam.Direction = ParameterDirection.ReturnValue;
            foreach (PropertyInfo property in obj.GetType().GetProperties())
            {
                if (!(Attribute.IsDefined(property, typeof(NoSendToSQL)) || Attribute.IsDefined(property, typeof(NoSQL))))
                //if (property.GetValue(obj, null) != null && !(Attribute.IsDefined(property, typeof(NoSendToSQL)) || Attribute.IsDefined(property, typeof(NoSQL))))
                {
                    Type t = Nullable.GetUnderlyingType(property.PropertyType) ?? property.PropertyType;
                    paremeters.Add(new SqlParameter(property.Name, (property.GetValue(obj, null) == null ? null : Convert.ChangeType(property.GetValue(obj, null), t))));
                }
            }
            return paremeters;
        }


        /// <summary>
        /// Create a table with one column (name column like name string and type = T) and insert values of list to it
        /// </summary>
        /// <param name="name">Name of column</param>
        /// <param name="obj">List of values to insert to the table</param>
        /// <returns>DataTable with one column</returns>
        public static DataTable GetDataTable(string name, List<T> obj)
        {
            DataTable dt = new DataTable();
            dt.Columns.Add(name, typeof(T));
            dt.Clear();
            DataRow r;
            if (obj != null)
                for (int i = 0; i < obj.Count; i++)
                {
                    r = dt.NewRow();
                    r[name] = obj[i];
                    dt.Rows.Add(r);
                }
            return dt;
        }

        /// <summary>
        /// Create table with columns by T data members (name and type of column as data member) and insert values of list to it
        /// </summary>
        /// <param name="obj">List to generate a table</param>
        /// <returns>DataTable of list</returns>
        public static DataTable GetDataTable(List<T> obj)
        {
            T t = new T();
            DataTable dt = new DataTable();

            foreach (PropertyInfo property in t.GetType().GetProperties())
                if (!(Attribute.IsDefined(property, typeof(NoSendToSQL)) || Attribute.IsDefined(property, typeof(NoSQL))))
                {
                    //dt.Columns.Add(property.Name, property.PropertyType);         
                    dt.Columns.Add(property.Name, Nullable.GetUnderlyingType(property.PropertyType) ?? property.PropertyType);
                }
            dt.Clear();

            DataRow r;
            if (obj != null)
                foreach (T row in obj)
                {
                    r = dt.NewRow();
                    foreach (PropertyInfo property in row.GetType().GetProperties())
                        if (!(Attribute.IsDefined(property, typeof(NoSendToSQL)) || Attribute.IsDefined(property, typeof(NoSQL))))
                        {
                            //r[property.Name] = Convert.ChangeType(property.GetValue(row, null), property.PropertyType);
                            r[property.Name] = property.GetValue(row, null) == null ? DBNull.Value : Convert.ChangeType(property.GetValue(row, null), Nullable.GetUnderlyingType(property.PropertyType) ?? property.PropertyType);
                        }
                    dt.Rows.Add(r);
                }
            return dt;
        }

        /// <summary>
        /// Create a new object with data as a old object 
        /// </summary>
        /// <param name="obj">Object</param>
        /// <returns>New Object</returns>
        public static T GetObject(T obj)
        {
            string json = JsonConvert.SerializeObject(obj);
            return new JavaScriptSerializer().Deserialize<T>(json);
        }

        /// <summary>
        /// Set Data in Child Object as Parent
        /// </summary>
        /// <param name="childObj">Child Object</param>
        /// <param name="parentObj">Parent Object</param>
        /// <returns>Child Object with Parent Data</returns>
        public static T SetParentData(T childObj, object parentObj)
        {
            foreach (PropertyInfo prop in parentObj.GetType().GetProperties())
                childObj.GetType().GetProperty(prop.Name).SetValue(childObj, prop.GetValue(parentObj, null), null);

            return childObj;
        }

        /// <summary>
        /// Set Data in Parent Object as Child
        /// </summary>
        /// <param name="childObj">Child Object</param>
        /// <param name="parentObj">Parent Object</param>
        /// <returns>Parent Object with Child Data</returns>
        public static T SetChildData(T parentObj, object childObj)
        {
            foreach (PropertyInfo prop in parentObj.GetType().GetProperties())
                parentObj.GetType().GetProperty(prop.Name).SetValue(parentObj, prop.GetValue(childObj, null), null);

            return parentObj;
        }

        public static List<T> GeneratListFromDataRowCollection(DataRowCollection collection)
        {
            Dictionary<string, Type> data = new Dictionary<string, Type>();
            List<T> objects = new List<T>();
            if (collection.Count == 0) return objects;
            T obj = new T();
            //all T object members repeat
            foreach (PropertyInfo property in obj.GetType().GetProperties())
            {
                if (collection[0].Table.Columns.Contains(property.Name) && !Attribute.IsDefined(property, typeof(NoGetFromSQL)))
                {
                    //data.Add(property.Name, property.PropertyType);
                    data.Add(property.Name, Nullable.GetUnderlyingType(property.PropertyType) ?? property.PropertyType);
                }
            }

            foreach (DataRow dr in collection)
            {
                obj = new T();
                foreach (KeyValuePair<string, Type> item in data)
                {
                    object cell = dr[item.Key];
                    if (cell != DBNull.Value)
                    {
                        //property.SetValue(obj, Convert.ChangeType(((DateTime)cell), typeof(DateTime)), null);
                        //obj.item
                        //         Convert.ChangeType((dr[item.Key]),);
                        if (item.Value == typeof(DateTime))
                            obj.GetType().GetProperty(item.Key).SetValue(obj, Convert.ChangeType(((DateTime)dr[item.Key]), item.Value), null);
                        else
                            obj.GetType().GetProperty(item.Key).SetValue(obj, Convert.ChangeType(dr[item.Key], item.Value), null);
                        // object safeValue = (value == null) ? null : Convert.ChangeType(value, t);
                        //                    item.Key
                    }
                }
                objects.Add(obj);
            }
            return objects;
        }
    }

}