
using Service.Utilities;
using System;
using System.Collections.Generic;
using System.Data;
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

        public static List<Conversation> GetConversations(int iPersonId)
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
      
      
        //public static List<Student> GetStudentList()
        //{
        //    try
        //    {
        //        DataTable dt = SqlDataAccess.ExecuteDatasetSP("TStudent_SLCT").Tables[0];                
        //        List<Student> students = ObjectGenerator<Student>.GeneratListFromDataRowCollection(dt.Rows);
        //        return students;
        //    }
        //    catch (Exception ex)
        //    {
        //        Log.LogError("GetStudentList / TStudent_SLCT", "ex" + ex);
        //        return null;
        //    }
        //}

        //public static bool AddStudent(Student student)
        //{
        //    try
        //    {
        //        ///ObjectGenerator<Student>.GetSqlParametersFromObject(student)
        //        SqlDataAccess.ExecuteDatasetSP("TStudent_INS");
        //        return true;
        //    }
        //    catch (Exception ex)
        //    {
        //        Log.LogError("AddStudent / TStudent_INS", "ex" + ex);
        //        return false;
        //    }
        //}
      
    }
}