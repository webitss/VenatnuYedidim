using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;
using Service.Entities;

namespace Service.Utilities
{
    public class Enums
    {
        public enum eUserPermissionType : int { Director = 0, Guest = 1, Avrech = 2 };
    }

    [DataContract]
    public class T2Int {
        [DataMember]
        public int iId1 { get; set; }
        [DataMember]
        public int iId2 { get; set; }

        //public T2Int(int _iId1 , int _iId2 ) {
        //    iId1 = _iId1;
        //    iId2 = _iId2;
        //}
    }


    [DataContract]
    public class TInt
    {
        [DataMember]
        public int iId { get; set; }
      

        //public T2Int(int _iId1 , int _iId2 ) {
        //    iId1 = _iId1;
        //    iId2 = _iId2;
        //}
    }
}