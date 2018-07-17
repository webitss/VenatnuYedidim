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


        {
            try
            {
                List<SqlParameter> parameters = new List<SqlParameter>();
                parameters.Add(new SqlParameter("iPersonId", iPersonId));
                parameters.Add(new SqlParameter("iUserId", iUserId));
                parameters.Add(new SqlParameter("nvLastName", nvLastName));
                parameters.Add(new SqlParameter("nvFirstName", nvFirstName));
                parameters.Add(new SqlParameter("nvMobile", nvMobile));
                parameters.Add(new SqlParameter("nvEmail", nvEmail));
                parameters.Add(new SqlParameter("nvUserName", nvUserName));
                parameters.Add(new SqlParameter("nvPassword", nvPassword));
                parameters.Add(new SqlParameter("iPermissionType", iPermissionType));
                DataRow dr = SqlDataAccess.ExecuteDatasetSP("TUser_INSRT", parameters).Tables[0].Rows[0];
            }
            catch (Exception ex)
            {
                Log.LogError("SetUser / TUser_INSRT", "iPersonId: " + iPersonId + ", iUserId: " + iUserId + ", nvLastName:" +
                    nvLastName + ", nvFirstName:" + nvFirstName + ", nvPhone:" + nvMobile + ", nvEmail:" + nvEmail + ", nvUserName:" +
                    nvUserName + ", nvPassword:" + nvPassword + ", iPermissionType:" + iPermissionType + ",ex: " + ex);
            }
        }
        #endregion
    }
}