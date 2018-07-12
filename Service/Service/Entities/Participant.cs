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
        #region Data Members

        [DataMember]
        public int iEventId { get; set; }
        [DataMember]
        public int iPersonId { get; set; }
        [DataMember]
        public int iArrivalStatus { get; set; }

        #endregion

        //להוסיף iPersonId
        //של היוזר ולשלוף את המשתתפים לפיו
        public static List<Person> GetParticipantsList(int iEventId)
        {
            try
            {
                DataTable dt = SqlDataAccess.ExecuteDatasetSP("TParticipant_SLCT", new SqlParameter("iEventId", iEventId)).Tables[0];                
              
                List<Person> participants = new List<Person>();
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    Person p = new Person();
                    p.nvLastName = dt.Rows[i]["nvLastName"].ToString();
                    p.nvFirstName = dt.Rows[i]["nvFirstName"].ToString();
                    p.nvPhone = dt.Rows[i]["nvPhone"].ToString();
                    p.nvMobile = dt.Rows[i]["nvMobile"].ToString();
                    p.nvEmail = dt.Rows[i]["nvEmail"].ToString();
                    p.lstObject.Add("iArrivalStatusType", dt.Rows[i]["iArrivalStatusType"].ToString());
                    participants.Add(p);
                }

                return participants;
            }
            catch (Exception ex)
            {
                Log.LogError("GetParticipantsList / TParticipant_SLCT", "ex" + ex);
                return null;
            }
        }

    }
}