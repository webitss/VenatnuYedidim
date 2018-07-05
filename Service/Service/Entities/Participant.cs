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
    public class Participant
    {
    
        [DataMember]
        public int iEventId { get; set; }
        [DataMember]
        public int iPersonId { get; set; }
        [DataMember]
        public int iArrivalStatus { get; set; }

    }
}