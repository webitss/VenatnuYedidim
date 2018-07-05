using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Service.Entities
{
    public class SysTables
    {
        [DataMember]
        public int iSysTableId { get; set; }
        [DataMember]
        public string nvSysTableName { get; set; }
    }
}

