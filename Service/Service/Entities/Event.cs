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

        public static List<Event> GetList(string nvUserName, string nvPassword)
        {
            try
            {

                DataRow dr = SqlDataAccess.ExecuteDatasetSP("TEvent_SLCT").Tables[0].Rows[0];
                //User user = ObjectGenerator<User>.GeneratFromDataRow(dr);
                List<Event> events=ObjectGenerator<List<Event>>.GeneratFromDataRow(dr);
                return events;
            }
            catch (Exception ex)
            {                
                Log.LogError("GetList / TEvent_SLCT","ex"+ex);
                return null;
            }
        }
    }
}