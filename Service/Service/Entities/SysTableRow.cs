﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Runtime.Serialization;
using System.Data.SqlClient;
using System.Data;
using Service.Utilities;


namespace Service.Entities
{
    public class SysTableRow
    {
    #region Data Members
        [DataMember]
        public int iSysTableRowId { get; set; }
        [DataMember]
        public int iSysTableId { get; set; }
        [DataMember]
        public string nvValue { get; set; }
    #endregion

        #region Constractors

        #endregion

        #region Methods
        public List<SysTableRow> GetValues(string nvSysTableName)
        {
            try
            {
                SqlParameter parameter = new SqlParameter("nvSysTableName", nvSysTableName);
                DataTable dt = SqlDataAccess.ExecuteDatasetSP("TSysTableRow_ByTableId_SLCT", parameter).Tables[0];
                DataRowCollection drc = dt.Rows;
                return ObjectGenerator<SysTableRow>.GeneratListFromDataRowCollection(drc);
            }
            catch (Exception ex)
            {
                Log.LogError("GetValues / TSysTableRow_ByTableId_SLCT", "nvSysTableName: " + nvSysTableName +", ex " + ex);
                return null;
            }
          
        }
        public bool AddValue(int iSysTableId,string nvValue)
        {
            try
            {
                List<SqlParameter> parameters = new List<SqlParameter>();
                parameters.Add(new SqlParameter("iSysTableId", iSysTableId));
                parameters.Add(new SqlParameter("nvValue", nvValue));
                SqlDataAccess.ExecuteDatasetSP("TSysTableRow_INS", parameters);
                return true;
            }
            catch (Exception ex)
            {
                Log.LogError("AddValue / TSysTableRow_INS", "iSysTableId: " + iSysTableId +"nvValue"+nvValue+ ex +" , ex");
                return false;
            }

        }
        public bool UpdateValue(int iSysTableId, string nvValue)
        {
            try
            {

                return true;
            }
            catch(Exception ex)
            {
                List<SqlParameter> parameters = new List<SqlParameter>();
                parameters.Add(new SqlParameter("iSysTableId", iSysTableId));
                parameters.Add(new SqlParameter("nvValue", nvValue));
                SqlDataAccess.ExecuteDatasetSP("TSysTableRow_UPD", parameters);
                Log.LogError("AddValue / TSysTableRow_UPD", "iSysTableId: " + iSysTableId + "nvValue" + nvValue + ex + " , ex");
                return false;
            }
        }

        #endregion

    }
}
