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

List<SqlParameter> parameters =new List<SqlParameter>();

				for (int i = 0; i < GlobalParameters.Count(); i++)
				{

					parameters = ObjectGenerator<TGlobalParameters>.GetSqlParametersFromObject(GlobalParameters[i]);
				
               

                SqlDataAccess.ExecuteDatasetSP("TGlobalParameters_INS", parameters);
				}

               
                return true;
            }
            catch (Exception ex)
            {
                Log.LogError("SaveGlobalParameters / TSysTableRow_INS",  ex + " , ex");
                return false;
            }

        }
		public static bool UpdGlobalParameters(List<TGlobalParameters> GlobalParameters)

		{
			try
			{
				GlobalParameters[0].iParameterId = 167;
				GlobalParameters[0].iParameterId = 168;
				GlobalParameters[0].iParameterId = 169;
				List<SqlParameter> parameters = new List<SqlParameter>();

				for (int i = 0; i < GlobalParameters.Count(); i++)
				{

					parameters = ObjectGenerator<TGlobalParameters>.GetSqlParametersFromObject(GlobalParameters[i]);



					SqlDataAccess.ExecuteDatasetSP("TGlobalParameters_UPD", parameters);
					;
				}


				return true;
			}
			catch (Exception ex)
			{
				Log.LogError("UpdGlobalParameters / TSysTableRow_INS", ex + " , ex");
				return false;
			}

		}
		public static bool InsGlobalParameters(List<TGlobalParameters> GlobalParameters)

		{
			try
			{

				List<SqlParameter> parameters = new List<SqlParameter>();

				for (int i = 0; i < GlobalParameters.Count(); i++)
				{

					parameters = ObjectGenerator<TGlobalParameters>.GetSqlParametersFromObject(GlobalParameters[i]);



					SqlDataAccess.ExecuteDatasetSP("TGlobalParameters_INS", parameters);
					;
				}


				return true;
			}
			catch (Exception ex)
			{
				Log.LogError("InsGlobalParameters / TSysTableRow_INS", ex + " , ex");
				return false;
			}

		}
		public static List<TGlobalParameters> GetGlobalParameters()
        {
            try
            {
                
                DataTable dt = SqlDataAccess.ExecuteDatasetSP("TGlobalParameters_SLCT").Tables[0];
                DataRowCollection drc = dt.Rows;
				List<TGlobalParameters> TGlobalParameters = ObjectGenerator<TGlobalParameters>.GeneratListFromDataRowCollection(drc);
				return TGlobalParameters;
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