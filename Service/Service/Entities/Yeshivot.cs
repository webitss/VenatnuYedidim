using System;
using System.Collections.Generic;
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
    }
}