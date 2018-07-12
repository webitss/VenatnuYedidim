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
    public class SysTables
    {
        [DataMember]
        public int iSysTableId { get; set; }
        [DataMember]
        public string nvSysTableName { get; set; }
        #region Methods
        public static List<SysTables> GetAllNames()
        {
            try
            {
                DataTable dt = SqlDataAccess.ExecuteDatasetSP("TSysTables_SLCT").Tables[0];
                DataRowCollection drc = dt.Rows;
                return ObjectGenerator<SysTables>.GeneratListFromDataRowCollection(drc);
            }
            catch (Exception ex)
            {
                Log.LogError("GetAllNames / TSysTables_SLCT", ", ex " + ex);
                return null;
            }

        }
        #endregion
    }
}

