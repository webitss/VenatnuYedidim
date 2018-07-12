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
    public class Event
    {
        #region Data Members

        [DataMember]
        public int iEventId { get; set; }
        [DataMember]
        public string nvName { get; set; }
        [DataMember]
        public DateTime dtEventDate { get; set; }
        [DataMember]
        public string nvPlace { get; set; }
        [DataMember]
        public string nvComments { get; set; }

        #endregion

        public static List<Event> GetEventsList(int iUserId)
        {
            try
            {
                DataRowCollection drc = SqlDataAccess.ExecuteDatasetSP("TEvent_SLCT", new SqlParameter("iPersonId", iUserId)).Tables[0].Rows;
                List<Event> events = ObjectGenerator<Event>.GeneratListFromDataRowCollection(drc);
                return events;
            }
            catch (Exception ex)
            {
                Log.LogError("GetEventsList / TEvent_SLCT", "ex" + ex);
                return null;
            }
        }

        public static bool AddEvent(Event oEvent)
        {
            try
            {
                SqlDataAccess.ExecuteDatasetSP("TEvent_INS", ObjectGenerator<Event>.GetSqlParametersFromObject(oEvent));
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