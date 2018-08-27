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
    [DataContract]
    public class Yeshivot
    {
        #region Data Members

        [NoSendToSQL]
        [DataMember]
        public int iYeshivaId { get; set; }
        [DataMember]
        public string nvYeshivaName { get; set; }
        [DataMember]
        public string nvAddress { get; set; }
        [DataMember]
        public string nvCity { get; set; }
        [DataMember]
        public string nvContact { get; set; }
        [DataMember]
        public string nvEmail { get; set; }
        [DataMember]
        public string nvMobile { get; set; }
        [DataMember]
        public int iRoleType { get; set; }

        #endregion

        #region Methods

        public static List<Yeshivot> GetAllYeshivot(int iYeshivaId)
        {
            try
            {
                DataRowCollection drc = SqlDataAccess.ExecuteDatasetSP("TYeshivot_SLCT", new SqlParameter("iYeshivaId", iYeshivaId)).Tables[0].Rows;
                List <Yeshivot> yeshivots = ObjectGenerator<Yeshivot>.GeneratListFromDataRowCollection(drc);

                return yeshivots;
            }
            catch (Exception ex)
            {
                Log.LogError("GetAllYeshivot / TYeshivot_SLCT", "ex: " + ex);
                return null;
            }
        }

        public static bool AddYeshiva(Yeshivot yeshiva)
        {
            try
            {
                List<SqlParameter> parameters = ObjectGenerator<Yeshivot>.GetSqlParametersFromObject(yeshiva);
                DataRow dr = SqlDataAccess.ExecuteDatasetSP("TYeshivot_INS",parameters).Tables[0].Rows[0];
                return true;
            }
            catch (Exception ex)
            {
                Log.LogError("AddYeshiva / TYeshivot_INS", "ex" + ex + ", yeshiva: " + JsonConvert.SerializeObject(yeshiva));
                return false;
            }
        }

        public static bool EditYeshiva(Yeshivot yeshiva, int iYeshivaId)
        {
            try
            {
                List<SqlParameter> parameters = ObjectGenerator<Yeshivot>.GetSqlParametersFromObject(yeshiva);
                parameters.Add(new SqlParameter("iYeshivaId", iYeshivaId));
                SqlDataAccess.ExecuteDatasetSP("TYeshivot_UPD", parameters);
                return true;
            }
            catch(Exception ex)
            {
                Log.LogError("EditYeshiva / TYeshivot_UPD", "ex" + ex + ", yeshiva: " + JsonConvert.SerializeObject(yeshiva));
                return false;
            }
        }

        public static Yeshivot getYeshivaById(int iYeshivaId)
        {
            try
            {
                DataRow dr = SqlDataAccess.ExecuteDatasetSP("TYeshivot_getById_SLCT", new SqlParameter("iYeshivaId", iYeshivaId)).Tables[0].Rows[0];
                Yeshivot yeshiva= ObjectGenerator<Yeshivot>.GeneratFromDataRow(dr);
                return yeshiva;
            }
            catch (Exception ex)
            {
                Log.LogError("getYeshivaById / TYeshivot_getById_SLCT", "ex: " + ex);
                return null;
            }
        }

        public static bool DeleteYeshiva(int iYeshivaId, int iUserId)
        {
            try
            {
                List<SqlParameter> parameters = new List<SqlParameter>();
                parameters.Add(new SqlParameter("iYeshivaId", iYeshivaId));
                parameters.Add(new SqlParameter("iLastModifyUserId", iUserId));
                SqlDataAccess.ExecuteDatasetSP("TYeshivot_DEL", parameters);

                return true;
            }
            catch (Exception ex)
            {
                Log.LogError("DeleteYeshivot/TYeshivot_DEL", "ex" + ex);
                return false;
            }
        }

        #endregion
    }
}