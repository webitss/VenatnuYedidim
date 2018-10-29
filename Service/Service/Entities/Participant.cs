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
        public int iArrivalStatusType { get; set; }

        #endregion

        //להוסיף iPersonId
        //של היוזר ולשלוף את המשתתפים לפיו
        public static List<Person> GetParticipantsList(int iEventId)
        {
            try
            {
                DataTable dt = SqlDataAccess.ExecuteDatasetSP("TParticipant_GetParticipantByEventId_SLCT", new SqlParameter("iEventId", iEventId)).Tables[0];                
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
                   p.lstObject.Add("nvParticipantType", dt.Rows[i]["nvParticipantType"].ToString());

                    participants.Add(p);
                }

                return participants;
            }
            catch (Exception ex)
            {
                Log.LogError("GetParticipantsList / TParticipant_SLCT", "ex " + ex +", iEventId : "+ iEventId);
                return null;
            }
        }

        public static bool DeleteParticipant(int iEventId, int iPersonId, int iUserId)
        {
            try
            {
                List<SqlParameter> parameters = new List<SqlParameter>();
                parameters.Add(new SqlParameter("iEventId", iEventId));
                parameters.Add(new SqlParameter("iPersonId", iPersonId));
                parameters.Add(new SqlParameter("iUserId", iUserId));
                DataTable dt = SqlDataAccess.ExecuteDatasetSP("TParticipant_DEL", parameters).Tables[0];
                return true;
            }
            catch(Exception ex)
            {
                Log.LogError("DeleteParticipant / TParticipant_DEL", "ex " + ex);
                return false;
            }
        }
        public static List<Person> GetPersonList()
        {
            try
            {

                DataRowCollection drc = SqlDataAccess.ExecuteDatasetSP("TPerson_GetAllPerson_SLCT").Tables[0].Rows;
                List<Person> Persons = ObjectGenerator<Person>.GeneratListFromDataRowCollection(drc);

                for (int i = 0; i < drc.Count; i++)
                {
                    Person p = new Person();
                    //Persons[i].lstObject.Add(drc);
                    p.nvFirstName = drc[i]["nvFirstName"].ToString();
                    p.lstObject.Add("nvParticipantType", drc[i]["nvParticipantType"].ToString());
                    Persons.Add(p);
                }


                return Persons;
            }
            catch (Exception ex)
            {
                Log.LogError("GetPersonList / TPerson_GetAllPerson_SLCT", ": , ex " + ex);
                return null;
            }
        }
    }

}