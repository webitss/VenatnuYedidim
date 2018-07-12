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
    public class Avrech : Person
    {
        public static List<Avrech> GetAllAvrechim(int iPersonId)
        {
            try
            {
                DataRowCollection drc = SqlDataAccess.ExecuteDatasetSP("TAvrech_SLCT", new SqlParameter("iPersonId", iPersonId)).Tables[0].Rows;
                List<Avrech> avrech = ObjectGenerator<Avrech>.GeneratListFromDataRowCollection(drc);

                return avrech;
            }
            catch (Exception ex)
            {
                Log.LogError("GetAvrechim / TAvrech_SLCT", ", ex " + ex);
                return null;
            }
        }
    }
}