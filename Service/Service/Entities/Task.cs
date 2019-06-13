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
    public class Task
    {
        #region Data Members
        [DataMember]
        public int iTaskId { get; set; }
        [DataMember]
        public int iTaskType { get; set; }
        [DataMember]
        public DateTime dtTaskdatetime{ get; set; }
        [DataMember]
        public string nvComments { get; set; }
        [DataMember]
        public string iPersonId { get; set; }
        [DataMember]
        public string iStudentId { get; set; }

        #endregion

        #region Methods

        public Task()
        {
            dtTaskdatetime = new DateTime();
        }


      

        public static bool SetTask(Task task, int iUserId)
        {
            try
            {
                List<SqlParameter> parameters = ObjectGenerator<Task>.GetSqlParametersFromObject(task);
                parameters.Add(new SqlParameter("iUserId", iUserId));
                SqlDataAccess.ExecuteDatasetSP("TTask_INS/UPD", parameters);
                return true;
            }
            catch (Exception ex)
            {
                Log.LogError("SetTask / TTask_UPD/INS", "ex" + ex);
                return false;
            }
        }

        public static List<Task> GetTasksByPersonId( int iPersonId)
        {
            try
            {
                DataRowCollection drc = SqlDataAccess.ExecuteDatasetSP("TTask_SLCT", new SqlParameter("iPersonId", iPersonId)).Tables[0].Rows;
                List<Task> tasks = ObjectGenerator<Task>.GeneratListFromDataRowCollection(drc);
                return tasks;
            }
            catch (Exception ex)
            {
                Log.LogError("GetTasksByPersonId / TTask_SLCT", ", ex " + ex);
                return null;
            }
        }

        public static List<Action> GetActionsByPersonIdBetweenDates(int iPersonId,DateTime fromDate,DateTime toDate)
        {
            try 
            {
                //string FromDate;
                //string ToDate;
                //FromDate = fromDate.GetDateTimeFormats()[7];
                //ToDate = toDate.GetDateTimeFormats()[7];
                List<Action> allActions = new List<Action>();
                Action a = new Action();
                List<SqlParameter> parameters = new List<SqlParameter>();
                parameters.Add(new SqlParameter("iPersonId", iPersonId));
                parameters.Add(new SqlParameter("fromDate", fromDate.GetDateTimeFormats()[7]));
                parameters.Add(new SqlParameter("toDate", toDate.GetDateTimeFormats()[7]));
                DataRowCollection drc = SqlDataAccess.ExecuteDatasetSP("TTaskGetTasksByAvrechIdAndDates_SLCT", parameters).Tables[0].Rows;
                List<Task> tasks = ObjectGenerator<Task>.GeneratListFromDataRowCollection(drc);
                DataRowCollection drc2 = SqlDataAccess.ExecuteDatasetSP("TMeetingGetMeetingsByAvrechIdAndDates_SLCT", parameters).Tables[0].Rows;
                List<Meeting> meetings = ObjectGenerator<Meeting>.GeneratListFromDataRowCollection(drc2);
                DataRowCollection drc3 = SqlDataAccess.ExecuteDatasetSP("TConversationGetConversationByAvrechIdAndDates_SLCT", parameters).Tables[0].Rows;
                List<Conversation> conversations = ObjectGenerator<Conversation>.GeneratListFromDataRowCollection(drc3);
                int i = 0;
                foreach (var t in tasks)
                {
                    a.iActionId = i;
                    a.nvDate = t.dtTaskdatetime.Date.ToString();
                    a.nvHour = t.dtTaskdatetime.Hour.ToString();
                    a.nvComment = t.nvComments;
                    a.iTaskType = t.iTaskType;
                    allActions.Add(a);
                    a = new Action();
                    i++;
                }
                foreach (var m in meetings)
                {
                    a.iActionId = i;
                    a.nvDate = m.dtMeetingDate.Date.ToString();
                    a.nvHour = m.dtMeetingDate.Hour.ToString();
                    a.nvComment = m.nvSummary;
                    a.iTaskType = m.iMeetingId;
                    allActions.Add(a);
                    a = new Action();
                    i++;
                }
                foreach (var c in conversations)
                {
                    a.iActionId = i;
                    a.nvDate = c.dtConversationDate.Date.ToString();
                    a.nvHour = c.dtConversationDate.Hour.ToString();
                    a.nvComment = c.nvConversationSummary;
                    a.iTaskType = c.iConversationType;
                    allActions.Add(a);
                    a = new Action();
                    i++;
                }
                return allActions;
            }
            catch (Exception ex)
            {
                Log.LogError("GetTasksByPersonIdBetweenDates / TTaskGetTasksByAvrechIdAndDates_SLCT", ", ex " + ex);
                return null;
            }
        }

        public static bool DeleteTask(int iTaskId, int iPersonId)
        {
            try
            {
                List<SqlParameter> parameters = new List<SqlParameter>();
                parameters.Add(new SqlParameter("iTaskId", iTaskId));
                parameters.Add(new SqlParameter("iPersonId", iPersonId));
                SqlDataAccess.ExecuteDatasetSP("TTask_DEL", parameters);

                return true;
            }
            catch (Exception ex)
            {
                Log.LogError("DeleteTask / TTask_DEL", "ex" + ex);
                return false;
            }
        }
    
     



    }
        #endregion
}