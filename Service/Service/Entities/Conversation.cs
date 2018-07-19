﻿
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
    public class Conversation
    {
        #region Data Members

        [DataMember]
        public int iConversationId { get; set; }
        [DataMember]
        public int iPersonId { get; set; }
        [DataMember]
        public int iConversationType { get; set; }
        [DataMember]
        public DateTime dConversationDate { get; set; }
        [DataMember]
        public DateTime dtConversationTime { get; set; }
        [DataMember]
        public string nvConversationSummary { get; set; }
        [DataMember]
        public DateTime dtNextConversationDate { get; set; }
      

        #endregion

        public static List<Conversation> GetConversations(int? iPersonId)
        {
            try
            {
                DataTable dt = SqlDataAccess.ExecuteDatasetSP("TConversation_SLCT").Tables[0];
                List<Conversation> conversations = ObjectGenerator<Conversation>.GeneratListFromDataRowCollection(dt.Rows);
                return conversations;
            }
            catch (Exception ex)
            {
                Log.LogError("GetStudentConversation", "ex" + ex);
                return null;
            }
        }

     

        public static bool AddConversation(Conversation conversation,int iUserId)
        {
            
            try
            {
                List<SqlParameter> parameters = ObjectGenerator<Conversation>.GetSqlParametersFromObject(conversation);
               
                parameters.Add(new SqlParameter("iCreatedByUserId", conversation.iConversationType));


                DataRow dr = SqlDataAccess.ExecuteDatasetSP("TConversation_INS", parameters).Tables[0].Rows[0];
                return true;
            }
            catch (Exception ex)
            {
                Log.LogError("AddConversation / TConversation_INS", "ex" + ex);
                return false;
            }
        }

        public static bool UpdateConversation(Conversation conversation,int iUserId)
        {

            try
            {
                List<SqlParameter> parameters = ObjectGenerator<Conversation>.GetSqlParametersFromObject(conversation);
                parameters.Add(new SqlParameter("iLastModifyUserId", conversation.iConversationType));

                DataRow dr = SqlDataAccess.ExecuteDatasetSP("TConversation_UPD", parameters).Tables[0].Rows[0];
                return true;
            }
            catch (Exception ex)
            {
                Log.LogError("UpdateConversation / TConversation_UPD", "ex" + ex);
                return false;
            }
        }
        public static bool DeleteConversation(int iConversationId, int iUserId)
        {
            try
            {
                List<SqlParameter> parameters = new List<SqlParameter>();
                parameters.Add(new SqlParameter("iConversationId", iConversationId));
                parameters.Add(new SqlParameter("iLastModifyUserId", iUserId));
                DataRow dr = SqlDataAccess.ExecuteDatasetSP("TConversation_DEL", parameters).Tables[0].Rows[0];

                return true;
            }
            catch (Exception ex)
            {
                Log.LogError("DeleteConversation / TConversation_DEL", "ex" + ex);
                return false;
            }
        }
    }
}