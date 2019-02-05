using Service.Utilities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using NReco.PdfGenerator;
using System.Text;
using System.IO;

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

                List<SqlParameter> parameters = new List<SqlParameter>();

                for (int i = 0; i < GlobalParameters.Count(); i++)
                {

                    parameters = ObjectGenerator<TGlobalParameters>.GetSqlParametersFromObject(GlobalParameters[i]);



                    SqlDataAccess.ExecuteDatasetSP("TGlobalParameters_INS", parameters);
                }


                return true;
            }
            catch (Exception ex)
            {
                Log.LogError("SaveGlobalParameters / TSysTableRow_INS", ex + " , ex");
                return false;
            }

        }

        public static bool UpdGlobalParameters(List<TGlobalParameters> GlobalParameters)
        {
            try
            {

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



        public static string PrintToPDF(string body, string title, string nvFilePath = null)

        {
            try
            {

                if (nvFilePath != null)
                    body += "<img style='max-height:150px;max-width:150px;float:left' src='" + nvFilePath + "' /><br>";
               
                    //+ @"

                //   <table>
                //           <tr> ";
                //for (int i = 0; i < lReportsDet.Count; i++)
                //{
                //    body += "<td style='width:" + 20 + "px;border-left:1px solid gainsboro; border-bottom:1px solid black;'" + "> " + lReportsDet[i].nvFieldTitle + " </td>";
                //}
                //body += @"</tr>";
                //List<String> columns = new List<string>();
                //foreach (System.Data.DataColumn column in dt.Columns)
                //{
                //    columns.Add(column.ColumnName);
                //}
                //for (int i = 0; i < dt.Rows.Count; i++)
                //{
                //    body += @"  <tr> ";
                //    for (int j = 0; j < columns.Count; j++)
                //    {
                //        if (dt.Rows[i][columns[j]].ToString() == "undefined")
                //            body += @"<td style='width:" + lReportsDet[j].nFieldWidth + "px;border-left:1px solid gainsboro;  border-bottom:1px solid gainsboro;'" + ">" + @"</td>";
                //        else body += @"<td style='width:" + lReportsDet[j].nFieldWidth + "px;border-left:1px solid gainsboro;  border-bottom:1px solid gainsboro;'" + ">" + dt.Rows[i][columns[j]].ToString() + @"</td>";

                //    }
                //    body += @" </tr>";
                //}
                //body += @"</table>";
                string result = Fileshandler.GeneratePdf("", body, "", " הפקת דוח ");

                return result;
            }
            catch (Exception ex)
            {
                Log.LogError("PrintToPDF", ex.Message);
                return null;
            }
        }



        #endregion
    }
}