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
                SqlDataAccess.ExecuteDatasetSP("TTask_UPD/INS", parameters);
                return true;
            }
            catch (Exception ex)
            {
                Log.LogError("SetTask / TTask_UPD/INS", "ex" + ex);
                return false;
            }
        }

     
    
     



    }
        #endregion
}