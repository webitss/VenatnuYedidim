
using Service.Utilities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Service.Entities
{
    [DataContract]
    public class Student : Person
    {
        #region Data Members

        [DataMember]
        public string nvImgStudent { get; set; }
        [DataMember]
        public string nvBirthdate { get; set; }
        [DataMember]
        public DateTime dtBirthdate { get; set; }
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
        public DateTime dtAddStudentDate { get; set; }
        [DataMember]
        public string nvComment { get; set; }
        [DataMember]
        public int iStatusType { get; set; }

        #endregion

        //להוסיף iPersonId
        //של היוזר ולשלוף את התלמידים לפיו
        public static List<Student> GetStudentList()
        {
            try
            {
                DataTable dt = SqlDataAccess.ExecuteDatasetSP("TStudent_SLCT").Tables[0];                
                List<Student> students = ObjectGenerator<Student>.GeneratListFromDataRowCollection(dt.Rows);
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
                ///ObjectGenerator<Student>.GetSqlParametersFromObject(student)
                SqlDataAccess.ExecuteDatasetSP("TStudent_INS");
                return true;
            }
            catch (Exception ex)
            {
                Log.LogError("AddStudent / TStudent_INS", "ex" + ex);
                return false;
            }
        }
      
    }
}