
using Newtonsoft.Json;
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
        public Conversation()
        {
            dConversationDate = new DateTime();
            dtConversationTime = new DateTime();
            dtNextConversationDate = new DateTime();
        }


        public static List<Conversation> GetConversations(int? iPersonId)
        {
            try
            {
                DataRowCollection dt = SqlDataAccess.ExecuteDatasetSP("TConversation_SLCT", new SqlParameter("iPersonId", iPersonId)).Tables[0].Rows;
                List<Conversation> conversations = ObjectGenerator<Conversation>.GeneratListFromDataRowCollection(dt);
                return conversations;
            }
            catch (Exception ex)
            {
                Log.LogError("GetStudentConversation / TConversation_SLCT", "ex" + ex + ", iPersonId: " + iPersonId);
                return null;
            }
        }


        public static bool SetConversation(Conversation conversation, int iPersonId)
        {

            try
            {
                List<SqlParameter> parameters = ObjectGenerator<Conversation>.GetSqlParametersFromObject(conversation);
                parameters.Add(new SqlParameter("iCreatedByUserId", iPersonId));
                SqlDataAccess.ExecuteDatasetSP("TConversation_INS/UPD", parameters);
                return true;


            }
            catch (Exception ex)
            {
                Log.LogError("SetConversation / TConversation_INS/UPD", "ex" + ex + ", conversation: " + JsonConvert.SerializeObject(conversation));
                return false;
            }
        }
        //public static bool AddConversation(Conversation conversation, int iPersonId)
        //{

        //    try
        //    {
        //        List<SqlParameter> parameters = ObjectGenerator<Conversation>.GetSqlParametersFromObject(conversation);
        //        parameters.Add(new SqlParameter("iCreatedByUserId", iPersonId));
        //        SqlDataAccess.ExecuteDatasetSP("TConversation_INS", parameters);
        //        return true;


        //    }
        //    catch (Exception ex)
        //    {
        //        Log.LogError("AddConversation / TConversation_INS", "ex" + ex + ", conversation: " + JsonConvert.SerializeObject(conversation));
        //        return false;
        //    }
        //}

        //public static bool UpdateConversation(Conversation conversation, int iPersonId)
        //{

        //    try
        //    {
        //        List<SqlParameter> parameters = ObjectGenerator<Conversation>.GetSqlParametersFromObject(conversation);
        //        parameters.Add(new SqlParameter("iLastModifyUserId", iPersonId));
        //        SqlDataAccess.ExecuteDatasetSP("TConversation_UPD", parameters);


        //        return true;
        //    }
        //    catch (Exception ex)
        //    {
        //        Log.LogError("UpdateConversation / TConversation_UPD", "ex" + ex);
        //        return false;
        //    }
        //}
        public static bool DeleteConversation(int iConversationId, int iPersonId)
        {
            try
            {
                List<SqlParameter> parameters = new List<SqlParameter>();
                parameters.Add(new SqlParameter("iConversationId", iConversationId));
                parameters.Add(new SqlParameter("iLastModifyUserId", iPersonId));
                SqlDataAccess.ExecuteDatasetSP("TConversation_DEL", parameters);

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