using Newtonsoft.Json;
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
    public class PresenceAvrech
    {
        #region Data Members
        //[NoSendToSQL]
        [DataMember]
        public int iPresenceAvrech { get; set; }
		[DataMember]
		public int iPersonId { get; set; }
		[DataMember]
        public DateTime dtDatePresence { get; set; }
        [DataMember]
        public float iHoursSum { get; set; }

        #endregion

        #region Methods
        public static bool SetPresence(PresenceAvrech presence)
        {

            try
            {
                List<SqlParameter> parameters = ObjectGenerator<PresenceAvrech>.GetSqlParametersFromObject(presence);
                SqlDataAccess.ExecuteDatasetSP("TPresenceAvrech_INS/UPD", parameters);
                return true;
            }
            catch (Exception ex)
            {
                Log.LogError("SetPresence / TPresenceAvrech_INS/UPD", "ex" + ex + ", presence: " + JsonConvert.SerializeObject(presence));
                return false;
            }
        }
        public static List<PresenceAvrech> GetPresenceAvrechById(int iPersonId)
        {
            try
            {
                SqlParameter parameter = new SqlParameter("iPersonId", iPersonId);
                DataTable dt = SqlDataAccess.ExecuteDatasetSP("TPresenceAvrechById_SLCT", parameter).Tables[0];
                DataRowCollection drc = dt.Rows;
                return ObjectGenerator<PresenceAvrech>.GeneratListFromDataRowCollection(drc);
            }
            catch (Exception ex)
            {
                Log.LogError("GetPresenceAvrechById / TPresenceAvrechById_SLCT", "iPersonId" + iPersonId + ", ex " + ex);
                return null;
            }
        }
        public static bool DeletePresenceAvrech(int iPresenceAvrech,int iLastModifyUserId)
        {
            try
            {
                SqlDataAccess.ExecuteDatasetSP("TPresenceAvrech_DEL", new SqlParameter("iPersonId", iPresenceAvrech));
                return true;
            }
            catch
            {
                return false;
            }
            #endregion
        }
    }
}

