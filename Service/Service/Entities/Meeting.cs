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
    public class Meeting
    {
        #region Data Members
        [DataMember]
        public int iMeetingId { get; set; }
        [DataMember]
        public int iPersonId { get; set; }
        [DataMember]
        public int iMeetingType { get; set; }
        [DataMember]
        public DateTime dtMeetingDate { get; set; }
        [DataMember]
        public string nvSummary { get; set; }

        #endregion

        #region Methods

        public Meeting()
        {
            dtMeetingDate = new DateTime();
        }


        public static List<Meeting> GetMeetingsByStudentId(int iPersonId)
        {
            try
            {
                DataRowCollection drc = SqlDataAccess.ExecuteDatasetSP("TMeeting_SLCT", new SqlParameter("iPersonId", iPersonId)).Tables[0].Rows;
                List<Meeting> meetings = ObjectGenerator<Meeting>.GeneratListFromDataRowCollection(drc);
                return meetings;
            }
            catch (Exception ex)
            {
                Log.LogError("GetMeetings / TMeeting_SLCT", ", ex " + ex);
                return null;
            }

        }

        internal static bool SetMeeting(Meeting meeting, int iUserId)
        {
            try
            {

                List<SqlParameter> parameters = ObjectGenerator<Meeting>.GetSqlParametersFromObject(meeting);
                parameters.Add(new SqlParameter("iUserId", iUserId));
                SqlDataAccess.ExecuteDatasetSP("TMeeting_UPD/INS", parameters);
                return true;
            }
            catch (Exception ex)
            {
                Log.LogError("SetMeeting / TMeeting_UPD/INS", "ex" + ex);
                return false;
            }
        }

        public static bool AddMeeting(Meeting meeting, int iUserId)
        {
            try
            {
                
                List<SqlParameter> parameters = ObjectGenerator<Meeting>.GetSqlParametersFromObject(meeting);
                parameters.Add(new SqlParameter("iCreatedByUserId", iUserId));
                SqlDataAccess.ExecuteDatasetSP("TMeeting_INS", parameters);
                return true;
            }
            catch (Exception ex)
            {
                Log.LogError("AddMeeting / TMeeting_INS", "ex" + ex);
                return false;
            }
        }

        public static bool UpdateMeeting(Meeting meeting, int iUserId)
        {
            try
            {
                List<SqlParameter> parameters = ObjectGenerator<Meeting>.GetSqlParametersFromObject(meeting);
                parameters.Add(new SqlParameter("iLastModifyUserId", iUserId));
                SqlDataAccess.ExecuteDatasetSP("Tmeeting_UPD", parameters);
                return true;
            }
            catch (Exception ex)
            {
                Log.LogError("UpdateMeeting/Tmeeting_UPD", "ex" + ex);
                return false;
            }
        }

        public static bool DeleteMeeting(int iMeetingId, int iUserId)
        {
            try
            {
                List<SqlParameter> parameters=new List<SqlParameter>();
                parameters.Add(new SqlParameter("iMeetingId", iMeetingId));
                parameters.Add(new SqlParameter("iLastModifyUserId", iUserId));
                SqlDataAccess.ExecuteDatasetSP("TMeeting_DEL", parameters);

                return true;
            }
            catch (Exception ex)
            {
                Log.LogError("DeleteMeeting/Tmeeting_DEL", "ex" + ex);
                return false;
            }
        }



    }
        #endregion
}