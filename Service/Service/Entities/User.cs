using Service.Utilities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Service.Entities
{
    [DataContract]
    public class User : Person
    {
        #region Data Members

        [DataMember]
        public string nvUserName { get; set; }
        [DataMember]
        public string nvPassword { get; set; }
        [DataMember]
        public int iPermissionId { get; set; }

        #endregion

        #region Methods

        public static User Login(string nvUserName, string nvPassword)
        {
            try
            {
                List<SqlParameter> parameters = new List<SqlParameter>();
                parameters.Add(new SqlParameter("nvUserName", nvUserName));
                parameters.Add(new SqlParameter("nvPassword", nvPassword));
                DataRow dr;
                DataSet ds = SqlDataAccess.ExecuteDatasetSP("TUser_ByUserNameAndPassword_SLCT", parameters);
                if (ds.Tables[0].Rows.Count != 0)
                    dr = ds.Tables[0].Rows[0];
                else
                    dr = null;
                User user;
                if (dr != null)
                   return ObjectGenerator<User>.GeneratFromDataRow(dr);
                return null;

                 
            }
            catch (Exception ex)
            {
                Log.LogError("Login / TUser_ByUserNameAndPassword_SLCT", "nvUserName: " + nvUserName + ", nvPassword:" + nvPassword + ", ex " + ex);
                return null;
            }
        }
        

        public static User GetUser(int iPersonId)
        {
            try
            {
                DataRow dr = SqlDataAccess.ExecuteDatasetSP("TUser_GetUser_SLCT", new SqlParameter("iPersonId", iPersonId)).Tables[0].Rows[0];
                User user = ObjectGenerator<User>.GeneratFromDataRow(dr);
                return user;
            }
            catch (Exception ex)
            {
                Log.LogError("GetUser / TUser_GetUser_SLCT", "iPersonId: " + iPersonId + ", ex " + ex);
                return null;
            }
        }

        public static List<User> GetUsers(int iPersonId)
        {
            try
            {
                DataRowCollection drc = SqlDataAccess.ExecuteDatasetSP("TUser_GetUsers_SLCT", new SqlParameter("iPersonId", iPersonId)).Tables[0].Rows;
                List<User> users = ObjectGenerator<User>.GeneratListFromDataRowCollection(drc);
                return users;
            }
            catch (Exception ex)
            {
                Log.LogError("GetUsers / TUser_GetUsers_SLCT", "iPersonId:" + iPersonId + ",ex " + ex);
                return null;
            }
        }


        public static bool SetUser(User user, int iUserId)
        {
            try
            {
                List<SqlParameter> parameters = ObjectGenerator<User>.GetSqlParametersFromObject(user);
                parameters.Add(new SqlParameter("iUserId", iUserId));
                

                int id=int.Parse(SqlDataAccess.ExecuteDatasetSP("TUser_INS/UPD", parameters).Tables[0].Rows[0].ItemArray[0].ToString());

                if (user.iPermissionId == 6)
                {
                    List<SqlParameter> parameters2 = new List<SqlParameter>();

                    parameters2.Add(new SqlParameter("iPersonId", id));
                    parameters2.Add(new SqlParameter("iUserId", iUserId));
                    SqlDataAccess.ExecuteDatasetSP("TAvrech_INS", parameters2);
                }
                return true;

            }

            catch (Exception ex)
            {
                Log.LogError("SetUser / TUser_INS/UPD", "ex: " + ex);
                return false;
            }
        }

        public static bool DeleteUser(int iPersonId, int iUserId)
        {
            try
            {
                List<SqlParameter> parameters = new List<SqlParameter>();
                parameters.Add(new SqlParameter("iPersonId", iPersonId));
                parameters.Add(new SqlParameter("iUserId", iUserId));
                DataRowCollection drc = SqlDataAccess.ExecuteDatasetSP("TUser_DEL", parameters).Tables[0].Rows;
                return true;

            }

            catch (Exception ex)
            {
                Log.LogError("DeleteUser / TUser_DEL", "ex: " + ex);
                return false;
            }
        }

        #endregion
    }
}