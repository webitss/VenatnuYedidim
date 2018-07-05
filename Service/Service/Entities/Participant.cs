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
    public class Participant
    {
    
        [DataMember]
        public int iEventId { get; set; }
        [DataMember]
        public int iPersonId { get; set; }
        [DataMember]
        public int iArrivalStatus { get; set; }

        public static List<Person> GetParticipantsList(int iEventId)
        {
            try
            {
                List<SqlParameter> parameters = new List<SqlParameter>();
                parameters.Add(new SqlParameter("iEventId", iEventId));
                DataTable dt = SqlDataAccess.ExecuteDatasetSP("TParticipant_SLCT",parameters).Tables[0];
                DataRowCollection drc = dt.Rows;
                List<Person> participants = ObjectGenerator<Person>.GeneratListFromDataRowCollection(drc);
                foreach (var item in participants)
                {
                    Person p = new Person() { };
                }
           
                return participants;
            }
            catch (Exception ex)
            {
                Log.LogError("GetList / TEvent_SLCT", "ex" + ex);
                return null;
            }
        }

    }
}