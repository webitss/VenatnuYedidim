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
        public int iPermissionType { get; set; }

        #endregion

        #region Methods

        public static User Login(string nvUserName, string nvPassword)
        {
            try
            {
                List<SqlParameter> parameters = new List<SqlParameter>();
                parameters.Add(new SqlParameter("nvUserName", nvUserName));
                parameters.Add(new SqlParameter("nvPassword", nvPassword));
                DataRow dr = SqlDataAccess.ExecuteDatasetSP("TUser_ByUserNameAndPassword_SLCT", parameters).Tables[0].Rows[0];
                User user = ObjectGenerator<User>.GeneratFromDataRow(dr);

                return user;
            }
            catch (Exception ex)
            {
                Log.LogError("Login / TUser_ByUserNameAndPassword_SLCT", "nvUserName: " + nvUserName + ", nvPassword:" + nvPassword + ", ex " + ex);
                return null;
            }
        }


        public static List<User> GetUsers(int iPersonId)
        {
            try
            {
                DataRowCollection drc = SqlDataAccess.ExecuteDatasetSP("TUser_GetUsersByPermission_SLCT", new SqlParameter("iPersonId", iPersonId)).Tables[0].Rows;
                List<User> users = ObjectGenerator<User>.GeneratListFromDataRowCollection(drc);
                return users;
            }
            catch (Exception ex)
            {
                Log.LogError("GetUsers / TUser_GetUsersByPermission_SLCT", "iPersonId:" + iPersonId + ",ex " + ex);
                return null;
            }
        }


        public static bool SetUser(User user)
        {
            try
            {
                SqlDataAccess.ExecuteDatasetSP("TUser_INSRT", ObjectGenerator<User>.GetSqlParametersFromObject(user));
                return true;
                
            }
            catch (Exception ex)
            {
                Log.LogError("SetUser / TUser_INSRT", "user: " + user + " ,ex: " + ex);
                return false;
            }
        }
        #endregion
    }
}