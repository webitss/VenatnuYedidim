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

        [DataMember]
        public int nvShowText { get; set; }
        #endregion

        #region Methods

        public static List<SysTableRow> GetValues(int iSysTableId)
        {
            try
            {
                SqlParameter parameter = new SqlParameter("iSysTableId", iSysTableId);
                DataTable dt = SqlDataAccess.ExecuteDatasetSP("TSysTableRow_ByTableId_SLCT", parameter).Tables[0];
                DataRowCollection drc = dt.Rows;
                return ObjectGenerator<SysTableRow>.GeneratListFromDataRowCollection(drc);
            }
            catch (Exception ex)
            {
                Log.LogError("GetValues / TSysTableRow_ByTableId_SLCT", "iSysTableId: " + iSysTableId + ", ex " + ex);
                return null;
            }

        }

        //להפוך לאובייקט
        public static bool AddValue(SysTableRow sysTableRow, int iUserId)

        {

            try
            {
                List<SqlParameter> parameters = ObjectGenerator<SysTableRow>.GetSqlParametersFromObject(sysTableRow);
                parameters.Remove(parameters.Find(x => x.ParameterName == "nvShowText"));
                parameters.Add(new SqlParameter("iUserId", iUserId));


                SqlDataAccess.ExecuteDatasetSP("TSysTableRow_INS", parameters);
               
                
                return true;
            }
            catch (Exception ex)
            {
                Log.LogError("AddValue / TSysTableRow_INS", "iSysTableId: " + sysTableRow.iSysTableId + "nvValue" + sysTableRow.nvValue + ex + " , ex");
                return false;
            }

        }

        //להחליף את iSysTableId
        //ב iSysTableRowId
        public static bool UpdateValue(SysTableRow sysTableRow, int iUserId)
        {

 
            try
            {
                List<SqlParameter> parameters = ObjectGenerator<SysTableRow>.GetSqlParametersFromObject(sysTableRow);
                parameters.Add(new SqlParameter("iUserId", iUserId));
                parameters.Remove(parameters.Find(x => x.ParameterName == "nvShowText"));


                SqlDataAccess.ExecuteDatasetSP("TSysTableRow_UPD", parameters);
                return true;
            }
            catch (Exception ex)
            {
                Log.LogError("AddValue / TSysTableRow_UPD", "iSysTableId: " + sysTableRow.iSysTableId + "nvValue" + sysTableRow.nvValue + ex + " , ex");
                return false;
            }
        }

        #endregion

    }
}
