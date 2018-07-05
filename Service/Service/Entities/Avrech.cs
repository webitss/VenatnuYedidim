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
    public class Avrech:Person
    {
        [DataMember]
        public string nvEmail { get; set; }

        public static List<Avrech> GetAllAvrechim(int iPersonId)
        {
            try
            {
                List<SqlParameter> parameters = new List<SqlParameter>();
                parameters.Add(new SqlParameter("iPersonId", iPersonId));
                DataRowCollection drc = SqlDataAccess.ExecuteDatasetSP("TAvrech_GetAllAvrechim_SLCT",parameters).Tables[0].Rows;
               List<Avrech> avrech = ObjectGenerator<Avrech>.GeneratListFromDataRowCollection(drc);

                return avrech;
            }
            catch (Exception ex)
            {
                Log.LogError("GetAllAvrechim / ", ", ex " + ex);
                return null;
            }
        }
    }
}