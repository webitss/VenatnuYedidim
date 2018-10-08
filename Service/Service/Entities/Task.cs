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
    public class Task
    {
        #region Data Members
        [DataMember]
        public int iTaskId { get; set; }
        [DataMember]
        public int iTaskType { get; set; }
        [DataMember]
        public DateTime dtTaskdatetime{ get; set; }
        [DataMember]
        public string nvComment { get; set; }
        [DataMember]
        public string iPersonId { get; set; }


        #endregion

        #region Methods

        public Task()
        {
            dtTaskdatetime = new DateTime();
        }


      

        public static bool SetTask(Task task, int iUserId)
        {
            try
            {
                List<SqlParameter> parameters = ObjectGenerator<Task>.GetSqlParametersFromObject(task);
                parameters.Add(new SqlParameter("iUserId", iUserId));
                SqlDataAccess.ExecuteDatasetSP("TTask_INS/UPD", parameters);
                return true;
            }
            catch (Exception ex)
            {
                Log.LogError("SetTask / TTask_UPD/INS", "ex" + ex);
                return false;
            }
        }

        public static List<Task> GetTasksByPersonId( int iPersonId)
        {
            try
            {
                DataRowCollection drc = SqlDataAccess.ExecuteDatasetSP("TTask_SLCT", new SqlParameter("iPersonId", iPersonId)).Tables[0].Rows;
                List<Task> tasks = ObjectGenerator<Task>.GeneratListFromDataRowCollection(drc);
                return tasks;
            }
            catch (Exception ex)
            {
                Log.LogError("GetTasksByPersonId / TTask_SLCT", ", ex " + ex);
                return null;
            }
        }

        public static bool DeleteTask(int iTaskId, int iPersonId)
        {
            try
            {
                List<SqlParameter> parameters = new List<SqlParameter>();
                parameters.Add(new SqlParameter("iTaskId", iTaskId));
                parameters.Add(new SqlParameter("iPersonId", iPersonId));
                SqlDataAccess.ExecuteDatasetSP("TTask_DEL", parameters);

                return true;
            }
            catch (Exception ex)
            {
                Log.LogError("DeleteTask / TTask_DEL", "ex" + ex);
                return false;
            }
        }
    
     



    }
        #endregion
}