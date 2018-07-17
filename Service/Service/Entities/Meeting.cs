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
        [DataMember]
        public int iCreatedByUserId { get; set; }
        [DataMember]
        public DateTime dtCreatedate { get; set; }
        [DataMember]
        public int iLastModifyUserId { get; set; }
        [DataMember]
        public DateTime dtLastModifyDate { get; set; }
        [DataMember]
        public bool bSysRowStatus { get; set; }
        #endregion

        #region Methods
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

        public static bool AddMeeting(Meeting meeting, int iUserId)
        {
            try
            {

                List<SqlParameter> parameters = ObjectGenerator<Meeting>.GetSqlParametersFromObject(meeting);
                parameters.Add(new SqlParameter("iCreatedByUserId", iUserId));
                SqlDataAccess.ExecuteDatasetSP("TMeeting_INC", parameters);
                return true;
            }
            catch (Exception ex)
            {
                Log.LogError("AddMeeting / TMeeting_INC", "ex" + ex);
                return false;
            }
        }

        public static bool UpdateMeeting(Meeting meeting, int iUserId)
        {
            try
            {
                List<SqlParameter> parameters = ObjectGenerator<Meeting>.GetSqlParametersFromObject(meeting);
                parameters.Add(new SqlParameter("iLastModifyUserId", iUserId));
                SqlDataAccess.ExecuteDatasetSP("TStudent_INS", parameters);
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