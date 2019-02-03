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
                int id;
                DataTable dt = SqlDataAccess.ExecuteDatasetSP("TParticipant_GetParticipantByEventId_SLCT", new SqlParameter("iEventId", iEventId)).Tables[0];
                List<Person> participants = new List<Person>();
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    Person p = new Person();


                    p.iPersonId = int.Parse(dt.Rows[i]["iPersonId"].ToString());
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
                Log.LogError("GetParticipantsList / TParticipant_SLCT", "ex " + ex + ", iEventId : " + iEventId);
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
            catch (Exception ex)
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
                    // Person p = new Person();
                    Persons[i].lstObject = new Dictionary<string, string>();
                    Persons[i].nvFirstName = drc[i]["nvFirstName"].ToString();
                    //Persons[i].iPersonId = drc[i]["iPersonId"].ToString();
                    Persons[i].lstObject.Add("nvParticipantType", drc[i]["nvParticipantType"].ToString());

                }


                return Persons;
            }
            catch (Exception ex)
            {
                Log.LogError("GetPersonList / TPerson_GetAllPerson_SLCT", ": , ex " + ex);
                return null;
            }
        }

        public static bool SetEventParticipant(bool isNew, int iStatusType, int iPersonId, int iEventId, int iUserId)
        {
            try
            {
                List<SqlParameter> parameters = new List<SqlParameter>();
                parameters.Add(new SqlParameter("isNew", isNew));
                parameters.Add(new SqlParameter("iStatusType", iStatusType));
                parameters.Add(new SqlParameter("iPersonId", iPersonId));
                parameters.Add(new SqlParameter("iEventId", iEventId));
                parameters.Add(new SqlParameter("iUserId", iUserId));
                SqlDataAccess.ExecuteDatasetSP("TParticipant_INS_UPD", parameters);
                return true;

            }
            catch (Exception ex)
            {
                Log.LogError("SetEventParticipant / TParticipant_INS_UPD", ": , ex " + ex);
                return false;
            }
        }

        public static bool SetEventParticipantList(Participant[] listParticipant, int iUserId)
        {
            DataTable dt = new DataTable();
            dt.Columns.Add("iEventId", typeof(int));
            dt.Columns.Add("iPersonId", typeof(int));
            dt.Columns.Add("iArrivalStatusType", typeof(int));
            try
            {
                List<SqlParameter> parameters = new List<SqlParameter>();
                for (int i = 0; i < listParticipant.Length; i++)
                {
                    DataRow dr = dt.NewRow();
                    dr["iEventId"] = listParticipant[i].iEventId;
                    dr["iPersonId"] = listParticipant[i].iPersonId;
                    dr["iArrivalStatusType"] = listParticipant[i].iArrivalStatusType;
                    dt.Rows.Add(dr);
                    //parameters.Add(new SqlParameter("iEventId", listParticipant[i].iEventId));
                    //parameters.Add(new SqlParameter("iPersonId",listParticipant[i].iPersonId));
                    //parameters.Add(new SqlParameter("iArrivalStatusType", listParticipant[i].iArrivalStatusType));


                }
                parameters.Add(new SqlParameter("lstParticipant", dt));
                parameters.Add(new SqlParameter("iUserId", iUserId));
                return true;
            }
            catch (Exception ex)
            {
                Log.LogError("SetEventParticipantLis / TParticipantList_INS_UPD", ": , ex " + ex);
                return false;
            }
        }
        //        public static bool SetEventParticipantList(Participant[] ParticipantList, int iUserId)
        //        {
        //            try
        //            {
        //                List<SqlParameter> parameters = new List<SqlParameter>();
        //>>>>>>> 9024b44d05dadf503992e7efc1d6e04f5f9bf3dd
        //                //parameters.Add(new SqlParameter("isNew", isNew));
        //                //parameters.Add(new SqlParameter("iStatusType", iStatusType));
        //                //parameters.Add(new SqlParameter("iPersonId", iPersonId));
        //                //parameters.Add(new SqlParameter("iEventId", iEventId));
        //                //parameters.Add(new SqlParameter("iUserId", iUserId));
        //<<<<<<< HEAD
        //                SqlDataAccess.ExecuteDatasetSP("TParticipant_List_INS_UPD", parameters);
        //=======
        //                SqlDataAccess.ExecuteDatasetSP("TParticipant_INS_UPD", parameters);
        //>>>>>>> 9024b44d05dadf503992e7efc1d6e04f5f9bf3dd
        //                return true;

        //            }
        //            catch (Exception ex)
        //            {
        //                Log.LogError("SetEventParticipant / TParticipant_INS_UPD", ": , ex " + ex);
        //                return false;
        //            }
        //        }
        //}

    }
}