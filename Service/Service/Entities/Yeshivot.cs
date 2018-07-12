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
        public int iRoleType { get; set; }
        [DataMember]
        public string nvEmail { get; set; }
        [DataMember]
        public string nvMobile { get; set; }

        #endregion

        public static List<Yeshivot> GetAllYeshivot()
        {
            try
            {
                DataRowCollection drc = SqlDataAccess.ExecuteDatasetSP("TYeshivot_SLCT").Tables[0].Rows;
                List<Yeshivot> yeshivots = ObjectGenerator<Yeshivot>.GeneratListFromDataRowCollection(drc);
                return yeshivots;
            }
            catch (Exception ex)
            {
                Log.LogError("GetAllYeshivot / TYeshivot_SLCT", "ex: " + ex);
                return null;
            }
        }
    }
}