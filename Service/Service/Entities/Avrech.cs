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
    public class Avrech : Person
    {
        public static List<Avrech> GetAllAvrechim(int? iPersonId)
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

        public static List<Student> GetAvrechStudents(int iPersonId)
        {
            try
            {
                DataRowCollection drc = SqlDataAccess.ExecuteDatasetSP("TStudent_ByAvrechId_SLCT", new SqlParameter("iPersonId", iPersonId)).Tables[0].Rows;
                List<Student> students = ObjectGenerator<Student>.GeneratListFromDataRowCollection(drc);
                return students;
            }
            catch (Exception ex)
            {
                Log.LogError("GetAvrechStudents / TAvrechStudents_ByAvrechId_SLCT", ", ex " + ex);
                return null;
            }
        }     

        public static Avrech GetAvrechById(int? iPersonId)
        {
            try
            {

                DataRow drc = SqlDataAccess.ExecuteDatasetSP("TAvrech_GetAvrechById_SLCT", new SqlParameter("iPersonId", iPersonId)).Tables[0].Rows[0];
                Avrech avrech = ObjectGenerator<Avrech>.GeneratFromDataRow(drc);

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