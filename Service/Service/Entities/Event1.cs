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
        //[DataMember]
        //public DateTime? dtCreatedate { get; set; }
        //[DataMember]
        //public int iLastModifyUserId { get; set; }
        //[DataMember]
        //public DateTime? dtLastModifyDate { get; set; }
        //[DataMember]
        //public bool bSysRowStatus { get; set; }

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

        public static bool SetEvent(Event1 oEvent, int iUserId, List<TInt> to)
        {
            try
            {
                List<SqlParameter> parameters = new List<SqlParameter>();
                parameters.Add(new SqlParameter("iEventId", oEvent.iEventId));
                parameters.Add(new SqlParameter("nvName", oEvent.nvName));
                parameters.Add(new SqlParameter("dtEventDate", oEvent.dtEventDate));
                parameters.Add(new SqlParameter("nvPlace", oEvent.nvPlace));
                parameters.Add(new SqlParameter("nvComments", oEvent.nvComments));
                parameters.Add(new SqlParameter("iUserId", iUserId));
                parameters.Add(new SqlParameter("participantIds", ObjectGenerator<TInt>.GetDataTable(to)));


                //parameters.Find(x => x.ParameterName == "iCreatedByUserId").Value = iUserId;
                SqlDataAccess.ExecuteDatasetSP("TEvent_INS/UPD", parameters);

                //List<SqlParameter> sqlParameters = new List<SqlParameter>();
                //sqlParameters.Add(new SqlParameter("iUserId", iUserId));
                //sqlParameters.Add(new SqlParameter("participantIds", ObjectGenerator<TInt>.GetDataTable(to)));

                //SqlDataAccess.ExecuteDatasetSP("TParticipants_INS", sqlParameters);

                
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
        

    }
}