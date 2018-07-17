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
        public string nvRoleType { get; set; }
        [DataMember]
        public string nvEmail { get; set; }
        [DataMember]
        public string nvMobile { get; set; }

        #endregion

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
                List<SqlParameter> parameters = new List<SqlParameter>();
                parameters.Add(new SqlParameter("nvYeshivaName", yeshiva.nvYeshivaName));
                parameters.Add(new SqlParameter("nvAddress", yeshiva.nvAddress));
                parameters.Add(new SqlParameter("nvCity", yeshiva.nvCity));
                parameters.Add(new SqlParameter("nvContact", yeshiva.nvContact));
                parameters.Add(new SqlParameter("iRoleType", yeshiva.nvRoleType));
                parameters.Add(new SqlParameter("nvEmail", yeshiva.nvEmail));
                parameters.Add(new SqlParameter("nvMobile", yeshiva.nvMobile));

                DataRow dr = SqlDataAccess.ExecuteDatasetSP("TYeshivot_INS",parameters).Tables[0].Rows[0];
                return true;
            }
            catch (Exception ex)
            {
                Log.LogError("AddYeshiva / TYeshivot_INS", "ex" + ex);
                return false;
            }
        }
    }
}