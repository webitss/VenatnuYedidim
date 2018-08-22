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
    public class Person
    {
        #region Data Members

        [DataMember]
        public int iPersonId { get; set; }
        [DataMember]
        public string nvFirstName { get; set; }
        [DataMember]
        public string nvLastName { get; set; }
        [DataMember]
        public string nvIdentityCard { get; set; }
        [DataMember]
        public string nvBirthdate { get; set; }
        [DataMember]
        public DateTime?  dtBirthdate { get; set; }
        [DataMember]
        public string nvPhone { get; set; }
        [DataMember]
        public string nvMobile { get; set; }
        [DataMember]
        public string nvEmail { get; set; }
        [DataMember]
        public string nvAddress { get; set; }
        [DataMember]
        public string nvCity { get; set; }

        
        [NoSQL]
        [DataMember]
        public Dictionary<string, string> lstObject { get; set; }

        #endregion

       public Person()
        {
            lstObject = new Dictionary<string, string>();
        }

      
        #region Methods

        public static Person GetPerson(int iPersonId)
        {
            try
            {
                DataRow dr = SqlDataAccess.ExecuteDatasetSP("TPerson_GetPersonById_SLCT", new SqlParameter("iPersonId", iPersonId)).Tables[0].Rows[0];
                Person person = ObjectGenerator<User>.GeneratFromDataRow(dr);

                return person;
            }
            catch (Exception ex)
            {
                Log.LogError("GetPersonById / TPerson_GetPersonById", "iPersonId" + iPersonId + ", ex " + ex);
                return null;
            }
        }

        #endregion
    }
}