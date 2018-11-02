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
        public static int SetPresence(PresenceAvrech presence, int iUserId)
        {

            try
            {
                List<SqlParameter> parameters = ObjectGenerator<PresenceAvrech>.GetSqlParametersFromObject(presence);
				parameters.Add(new SqlParameter("iUserId", iUserId));
				int id=int.Parse(SqlDataAccess.ExecuteDatasetSP("TPresenceAvrech_INS/UPD", parameters).Tables[0].Rows[0][0].ToString());
                id += 1;
                return id;
            }
            catch (Exception ex)
            {
                Log.LogError("SetPresence / TPresenceAvrech_INS/UPD", "ex" + ex + ", presence: " + JsonConvert.SerializeObject(presence));
                return 0;
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
		//public static List<PresenceAvrech> GetPresenceAvrechByIdPresence(int iPresenceAvrech)
		//{
		//	try
		//	{
		//		SqlParameter parameter = new SqlParameter("iPresenceAvrech", iPresenceAvrech);
		//		da dt = SqlDataAccess.ExecuteDatasetSP("TPresenceAvrechByIdPresence_SLCT", parameter);
		//		DataRow dr = dt;
		//		return ObjectGenerator<PresenceAvrech>.GeneratListFromDataRowCollection(drc);
		//	}
		//	catch (Exception ex)
		//	{
		//		Log.LogError("GetPresenceAvrechByIdPresence / TPresenceAvrechByIdPresence_SLCT", "@iPresenceAvrech" + @iPresenceAvrech + ", ex " + ex);
		//		return null;
		//	}
		//}

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

