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

        public static List<Event> GetEventsList(int iUserId)
        {
            try
            {
                SqlParameter UserId = new SqlParameter("iUserId", iUserId);
                DataRowCollection drc = SqlDataAccess.ExecuteDatasetSP("TEvent_SLCT", UserId).Tables[0].Rows;
                List<Event> events = ObjectGenerator<Event>.GeneratListFromDataRowCollection(drc);
                return events;
            }
            catch (Exception ex)
            {                
                Log.LogError("GetList / TEvent_SLCT","ex"+ex);
                return null;
            }
        }

        public static bool AddEvent(Event e)
        {
            try
            {
                List<SqlParameter> parameters = new List<SqlParameter>();
                parameters.Add(new SqlParameter("nvName",e.nvName));
                parameters.Add(new SqlParameter("dDate",e.dDate));
                parameters.Add(new SqlParameter("nvPlace",e.nvPlace));
                parameters.Add(new SqlParameter("nvComments",e.nvComments));
                SqlDataAccess.ExecuteDatasetSP("TEvent_INS",parameters);
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