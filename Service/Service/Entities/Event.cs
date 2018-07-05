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
        [DataMember]
        public int iEventId { get; set; }
        [DataMember]
        public string nvName { get; set; }
        [DataMember]
        public DateTime dDate { get; set; }
        [DataMember]
        public string nvPlace { get; set; }
        [DataMember]
        public string nvComments { get; set; }

        public static List<Event> GetEventsList()
        {
            try
            {
                DataTable dt = SqlDataAccess.ExecuteDatasetSP("TEvent_SLCT").Tables[0];
                DataRowCollection drc = dt.Rows;
                List<Event> events=ObjectGenerator<Event>.GeneratListFromDataRowCollection(drc);
                return events;
            }
            catch (Exception ex)
            {                
                Log.LogError("GetList / TEvent_SLCT","ex"+ex);
                return null;
            }
        }

        public static bool AddEvent()
        {
            try
            {
                SqlDataAccess.ExecuteDatasetSP("TEvent_INS");
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