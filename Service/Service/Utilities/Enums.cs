using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using Service.Entities;

namespace Service.Utilities
{
    public class Enums
    {
        public enum eUserPermissionType : int { Director = 0, Guest = 1, Avrech = 2 };
    }
}