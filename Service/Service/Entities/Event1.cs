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

        //[DataMember]
        //public int iEventId { get; set; }
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
                DataRowCollection drc = SqlDataAccess.ExecuteDatasetSP("TEvent_SLCT", new SqlParameter("iPersonId", iUserId)).Tables[0].Rows;
                List<Event1> events = ObjectGenerator<Event1>.GeneratListFromDataRowCollection(drc);
                return events;
            }
            catch (Exception ex)
            {
                Log.LogError("GetEventsList / TEvent_SLCT", "ex" + ex);
                return null;
            }
        }

        public static bool AddEvent(Event1 addEvent, int iUserId)
        {
            try
            {
                //addEvent.dtEventDate = DateTime.Today;
                List<SqlParameter> parameters = ObjectGenerator<Event1>.GetSqlParametersFromObject(addEvent);
                parameters.Add(new SqlParameter("iCreatedByUserId", iUserId));
                SqlDataAccess.ExecuteDatasetSP("TEvent_INS", parameters);
                return true;
            }
            catch (Exception ex)
            {
                Log.LogError("Add / TEvent_INS", "ex" + ex);
                return false;
            }
        }

    }
}