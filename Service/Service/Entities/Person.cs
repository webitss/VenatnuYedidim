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
        public string nvAddress { get; set; }
        [DataMember]
        public string nvCity { get; set; }
<<<<<<< HEAD
        
=======
        [NoSendToSQL]
        [DataMember]
        public int iCreatedByUserId { get; set; }
        [NoSendToSQL]
        [DataMember]
        public DateTime dtCreatedate { get; set; }
        [NoSendToSQL]
        [DataMember]
        public int? iLastModifyUserId { get; set; }
        [NoSendToSQL]
        [DataMember]
        public DateTime? dtLastModifyDate { get; set; }
        [NoSendToSQL]
        [DataMember]
        public bool bSysRowStatus { get; set; }
        [NoSendToSQL]
        [DataMember]
        public string nvStatus { get; set; }

        [DataMember]
        public Dictionary<string, string> lstObject { get; set; }


>>>>>>> d8c9ac45a7e689cd834a17ba30d928886c858c15
    }
}