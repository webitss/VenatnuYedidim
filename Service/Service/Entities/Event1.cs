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
    public class Event1
    {
        #region Data Members

        [DataMember]
        public int iEventId { get; set; }
        [DataMember]
        public string nvName { get; set; }
        [DataMember]
        public DateTime? dtEventDate { get; set; }
        [DataMember]
        public string nvPlace { get; set; }
        [DataMember]
        public string nvComments { get; set; }
        [DataMember]
        public int iCreatedByUserId { get; set; }

//<<<<<<< HEAD
//=======
//        [NoSendToSQL]
//        [DataMember]
//        public int iArrivalStatusType { get; set; }
//>>>>>>> e66fa32781388f11142c415964b0c0196ab9b0d1
//        //[DataMember]
//        //public DateTime? dtCreatedate { get; set; }
//        //[DataMember]
//        //public int iLastModifyUserId { get; set; }
//        //[DataMember]
//        //public DateTime? dtLastModifyDate { get; set; }
//        //[DataMember]
//        //public bool bSysRowStatus { get; set; }

        #endregion

        public static List<Event1> GetEventsList(int? iUserId)
        {
            try
            {
                DataRowCollection drc = SqlDataAccess.ExecuteDatasetSP("TEvent_SLCT", new SqlParameter("iUserId", iUserId)).Tables[0].Rows;
                List<Event1> events = ObjectGenerator<Event1>.GeneratListFromDataRowCollection(drc);
                return events;
            }
            catch (Exception ex)
            {
                Log.LogError("GetEventsList / TEvent_SLCT", "ex" + ex);
                return null;
            }
        }

        public static List<Event1> GetEventsByStudent(int iPersonId)
        {
            try
            {
                DataRowCollection drc = SqlDataAccess.ExecuteDatasetSP("TEvent_ByStudent_SLCT", new SqlParameter("iPersonId", iPersonId)).Tables[0].Rows;
                List<Event1> events = ObjectGenerator<Event1>.GeneratListFromDataRowCollection(drc);
                return events;
            }
            catch (Exception ex)
            {
                Log.LogError("GetEventsByStudent / TEvent_ByStudent_SLCT", "ex" + ex);
                return null;
            }
        }

        public static bool SetEvent(Event1 oEvent, int iUserId, List<TInt> to)
        {
            try
            {
                bool isNew;
                isNew = oEvent.iEventId == 0 ? true : false;
                List<SqlParameter> parameters = new List<SqlParameter>();
                parameters.Add(new SqlParameter("iEventId", oEvent.iEventId));
                parameters.Add(new SqlParameter("nvName", oEvent.nvName));
                parameters.Add(new SqlParameter("dtEventDate", oEvent.dtEventDate));
                parameters.Add(new SqlParameter("nvPlace", oEvent.nvPlace));
                parameters.Add(new SqlParameter("nvComments", oEvent.nvComments));
                parameters.Add(new SqlParameter("iUserId", iUserId));
                parameters.Add(new SqlParameter("participantIds", ObjectGenerator<TInt>.GetDataTable(to)));


                if(!isNew)
                    SqlDataAccess.ExecuteDatasetSP("TEvent_INS/UPD", parameters);
                if (isNew)
                {
                    User user = User.GetUser(iUserId);
                    DataRowCollection drc = SqlDataAccess.ExecuteDatasetSP("TEvent_INS/UPD", parameters).Tables[0].Rows;
                    for (int i = 0; i < drc.Count; i++)
                    {
                        int iPersonId = int.Parse(drc[i]["iPersonId"].ToString());
                        string nvEmail = drc[i]["nvEmail"].ToString();
                        string body = "<b>הנך מוזמן ל" + oEvent.nvName +
                            "</b><br>שיתקיים ב" + oEvent.nvPlace +
                            "<br>בתאריך " + oEvent.dtEventDate + "<br>" + oEvent.nvComments +
                             "<br><br> <b> בברכה </b> <br>" + user.nvFirstName + " " + user.nvLastName +
                             "<br> עמותת ונתנו ידידים";
                        string from=user.nvEmail;
                        if(user.nvEmail=="" || user.nvEmail==null)
                        {
                            from = ConfigSettings.ReadSetting("Email");
                        }
                        if(SendMessagesHandler.SendEmailOrFax(from, nvEmail, oEvent.nvName, body, null)==true)
                        {
                            List<SqlParameter> param = new List<SqlParameter>();
                            param.Add(new SqlParameter("iEventId", drc[i]["iEventId"]));
                            param.Add(new SqlParameter("iPersonId", iPersonId));
                            param.Add(new SqlParameter("iStatusType", 34));  //סטטוס קיבל הודעה
                            SqlDataAccess.ExecuteDatasetSP("TParticipantsUpdateArrivalStatus_UPD", param);
                        }
                    }
                    //SendMessagesHandler.SendEmailOrFax()
                }


                return true;
            }
            catch (Exception ex)
            {
                Log.LogError("set event / TEvent_INS/UPD", "ex" + ex);
                return false;
            }
        }

        public static Event1 GetEvent(int? iEventId)
        {
            try
            {
                DataRow dr = SqlDataAccess.ExecuteDatasetSP("TEvent_GetEvent_SLCT", new SqlParameter("iEventId", iEventId)).Tables[0].Rows[0];
                Event1 e = ObjectGenerator<Event1>.GeneratFromDataRow(dr);
                return e;
            }
            catch (Exception ex)
            {
                Log.LogError("GetEvent / TEvent_GetEvent_SLCT", "ex" + ex);
                return null;
            }
        }


        public static bool DeleteEvent(int? iEventId, int iUserId)
        {
            try
            {
                List<SqlParameter> sqlParameters = new List<SqlParameter>();
                sqlParameters.Add(new SqlParameter("iEventId", iEventId));
                sqlParameters.Add(new SqlParameter("iUserId", iUserId));
                SqlDataAccess.ExecuteDatasetSP("TEvent_DEL",sqlParameters );
                return true;
            }
            catch (Exception ex)
            {
                Log.LogError("GetEvent / TEvent_GetEvent_SLCT", "ex" + ex);
                return false;
            }
        }


    }
}