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
    public class Yeshivot
    {
        [DataMember]
        public int iYeshivaId { get; set; }
        [DataMember]
        public string nvYeshivaName { get; set; }
        [DataMember]
        public string nvAddress { get; set; }
        [DataMember]
        public string nvCity { get; set; }
        [DataMember]
        public string nvContact { get; set; }
        [DataMember]
        public string nvRole { get; set; }
        [DataMember]
        public string nvEmail { get; set; }
        [DataMember]
        public string nvSellPhone { get; set; }
        [DataMember]
        public int iRoleType { get; set; }
        [DataMember]
        public string nvColumnDefault { get; set; }

        [NoSendToSQL]
        [DataMember]
        public DateTime? dtCreatedate { get; set; }

        public static List<Yeshivot> getAllYeshivot(Yeshivot yeshivot)
        {
            try
            {
                //List<SqlParameter> parameters = new List<SqlParameter>();
                //DataRow dr = SqlDataAccess.ExecuteDatasetSP("TYeshivot_SLCT", parameters).Tables[0].Rows[0];

                //Yeshivot yeshivot1 = ObjectGenerator<Yeshivot>.GeneratFromDataRow(dr);

                return null;
            }catch(Exception ex)
            {
                return null;
            }
        }
    }
}