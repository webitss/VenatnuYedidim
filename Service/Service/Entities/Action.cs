using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Service.Entities
{
    public class Action
    {
        #region Data Members
        [DataMember]
        public int iActionId { get; set; }
        [DataMember]
        public string nvDate { get; set; }
        [DataMember]
        public string nvHour { get; set; }

        [DataMember]
        public string nvComment { get; set; }

        [DataMember]
        public int iTaskType { get; set; }
        #endregion
    }
}