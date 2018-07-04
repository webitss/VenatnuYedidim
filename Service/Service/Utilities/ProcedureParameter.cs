using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Service.Utilities
{
    //if defined this attribute the ObjectGeneratoe factory no add the class member to the parameters list
    public class NoSendToSQL : Attribute
    {
     
    }

    //if defined this attribute the ObjectGeneratoe factory not will try put the mach value from DataRow
    public class NoGetFromSQL : Attribute
    {

    }

    //if defined this attribute the ObjectGeneratoe factory no add the class member to the parameters list and  won't try put the mach value from DataRow
    public class NoSQL : Attribute
    {

    }
}