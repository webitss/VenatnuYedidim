
using Service.Utilities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Service.Entities
{
    public class Student:Person 
    {
        #region Data Members
        [DataMember]
        public string nvBornDate { get; set; }
        [DataMember]
        public DateTime dtBornDate { get; set; }
        [DataMember]
        public string nvFatherDeathDate { get; set; }
        [DataMember]
        public string nvMotherDeathDate { get; set; }
        [DataMember]
        public bool bDeathFather { get; set; }
        [DataMember]
        public bool bDeathMother { get; set; }
        [DataMember]
        public string nvCauseOfDeathFather { get; set; }
        [DataMember]
        public string nvCauseOfDeathMother { get; set; }
        [DataMember]
        public string nvYeshiva { get; set; }
        [DataMember]
        public string nvYeshivaAddress { get; set; }
        [DataMember]
        public int nvYeshivaCity { get; set; }
        [DataMember]
        public DateTime dtAddStudentDate { get; set; }
        [DataMember]
        public string nvComment { get; set; }
        [DataMember]
        public int iStatus { get; set; }
        #endregion


        public static List<Student> GetStudentList()
        {
            try
            {
                DataTable dt = SqlDataAccess.ExecuteDatasetSP("TStudent_SLCT").Tables[0];
                DataRowCollection drc = dt.Rows;
                List<Student> students = ObjectGenerator<Student>.GeneratListFromDataRowCollection(drc);
                return students;
            }
            catch (Exception ex)
            {
                Log.LogError("GetStudentList / TStudent_SLCT", "ex" + ex);
                return null;
            }
        }

        public static bool AddStudent(Student student)
        {
            try
            {
                SqlDataAccess.ExecuteDatasetSP("TStudent_INS");
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }


       





    }
}