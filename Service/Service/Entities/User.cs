﻿using Service.Utilities;
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
    public class User
    {
        #region Data Members

        [DataMember]
        public int iUserId { get; set; }
        [DataMember]
        public string nvUserName { get; set; }
        [DataMember]
        public string nvPassword { get; set; }
        [DataMember]
        public int iRoleType { get; set; }
        [DataMember]
        public string nvColumnDefault { get; set; }

        [NoSendToSQL]
        [DataMember]
        public DateTime? dtCreatedate { get; set; }

        #endregion

        #region Constractors     

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

        #endregion
    }


}