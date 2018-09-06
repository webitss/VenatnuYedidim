using Service.Utilities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace Service.Entities
{
    public class TGlobalParameters
    {
        public int iParameterId { get; set; }
        public string nvTitle { get; set; }
        public string nvValue { get; set; }
        #region Methods
        public static bool SaveGlobalParameters(List<TGlobalParameters> GlobalParameters)

        {

            try
            {


                
                List<SqlParameter> parameters = ObjectGenerator<TGlobalParameters>.GetSqlParametersFromObject(GlobalParameters[0]);

                    

                SqlDataAccess.ExecuteDatasetSP("TGlobalParameters_INS", parameters);

               
                return true;
            }
            catch (Exception ex)
            {
                Log.LogError("SaveGlobalParameters / TSysTableRow_INS",  ex + " , ex");
                return false;
            }

        }
        public static List<TGlobalParameters> GetGlobalParameters()
        {
            try
            {
                
                DataTable dt = SqlDataAccess.ExecuteDatasetSP("TGlobalParameters_SLCT").Tables[0];
                DataRowCollection drc = dt.Rows;
                return ObjectGenerator<TGlobalParameters>.GeneratListFromDataRowCollection(drc);
            }
            catch (Exception ex)
            {
                Log.LogError("SaveGlobalParameters / TGlobalParameters_SLCT", ", ex " + ex);
                return null;
            }

        }
        #endregion
    }
}