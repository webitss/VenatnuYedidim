using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Service.Entities
{
    public class Avrech:Person
    {
        [DataMember]
        public string nvEmail { get; set; }
    }
}