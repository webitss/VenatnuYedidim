using Service.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Service.Entities
{
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
    }
}