
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
    public class Student : Person
    {
        #region Data Members

       // [DataMember]
        //public int iStudentId { get; set; }
        [DataMember]
        public string nvImgStudent { get; set; }
        [DataMember]
        public string nvBirthdate { get; set; }
        [DataMember]
        public DateTime? dtBirthdate { get; set; }
        [DataMember]
        public string nvFatherDeathDate { get; set; }
        [DataMember]
        public string nvMotherDeathDate { get; set; }
        [DataMember]
        public bool? bDeathFather { get; set; }
        [DataMember]
        public bool? bDeathMother { get; set; }
        [DataMember]
        public string nvCauseOfDeathFather { get; set; }
        [DataMember]
        public string nvCauseOfDeathMother { get; set; }
        [DataMember]
        public DateTime? dtAddStudentDate { get; set; }
        [DataMember]
        public string nvComment { get; set; }
        [DataMember]
        public int iStatusType { get; set; }
        [DataMember]
        public string nvYeshivaName { get; set; }
        [DataMember]
        public string nvYeshivaStreet { get; set; }
        [DataMember]
        public string nvYeshivaCity { get; set; }

        #endregion

        public static bool AddStudentsToAvrech(List<T2Int> studentAndAvrechArr, int iUserId) {
            try
            {
                
                List<SqlParameter> sqlParameters = new List<SqlParameter>();
                 sqlParameters.Add(new SqlParameter("iUserId", iUserId));
                sqlParameters.Add(new SqlParameter("studentAndAvrechArr", ObjectGenerator<T2Int>.GetDataTable(studentAndAvrechArr)));

                SqlDataAccess.ExecuteDatasetSP("TAvrechStudents_INS/UPD", sqlParameters);
                //List<Student> students = ObjectGenerator<Student>.GeneratListFromDataRowCollection(drc);
                return true;
            }
            catch (Exception ex)
            {

                return false;

            }

        }

        public static List<Student> GetStudentList(int iUserId)
        {
            try
            {
                

                DataRowCollection drc = SqlDataAccess.ExecuteDatasetSP("TStudentGetStudentByUser_SLCT", new SqlParameter("iUserId", iUserId)).Tables[0].Rows;
                List<Student> students = ObjectGenerator<Student>.GeneratListFromDataRowCollection(drc);
                return students;
            }

   

            catch (Exception ex)
            {
                Log.LogError("GetStudentList / TStudentGetStudentByUser_SLCT", "ex" + ex);
                return null;
            }
        }

        public static Student GetStudentById(int iPersonId)
        {
            try
            {
                DataRow drc = SqlDataAccess.ExecuteDatasetSP("TStudentGetStudentbyId_SLCT", new SqlParameter("iPersonId", iPersonId)).Tables[0].Rows[0];
                Student student = ObjectGenerator<Student>.GeneratFromDataRow(drc);

                return student;
            }
            

            catch (Exception ex)
            {
                Log.LogError("GetStudentList / TStudentGetStudentbyId_SLCT", "ex" + ex);
                return null;
            }
        }



       


        public static bool AddStudent(Student student, int iUserId)
        {
            try
            {
                List<SqlParameter> parameters = ObjectGenerator<Student>.GetSqlParametersFromObject(student);
                parameters.Add(new SqlParameter("iUserId", iUserId));
                SqlDataAccess.ExecuteDatasetSP("TStudent_INS", parameters);

                return true;
            }
            catch (Exception ex)
            {
                Log.LogError("AddStudent / TStudent_INS", "ex" + ex);
                return false;
            }
        }


        public static bool UpdateStudent(Student student, int iUserId)
        {
            try
            {
                List<SqlParameter> parameters = ObjectGenerator<Student>.GetSqlParametersFromObject(student);
                parameters.Add(new SqlParameter("iUserId", iUserId));
                SqlDataAccess.ExecuteDatasetSP("TStudent_UPD", parameters);
                return true;
            }
            catch (Exception ex)
            {
                Log.LogError("UpdateStudent / TStudent_UPD", "ex" + ex);
                return false;
            }
        }

        public static bool UpdateStatusStudent(int iPersonId, int iStatusType)
        {
            try
            {
                List<SqlParameter> parameters = new List<SqlParameter>();
                parameters.Add(new SqlParameter("iPersonId", iPersonId));
                parameters.Add(new SqlParameter("iStatusType", iStatusType));
                SqlDataAccess.ExecuteDatasetSP("TStudentUpdateStatus_UPD", parameters);
                return true;
            }
            catch (Exception ex)
            {

                Log.LogError("UpdateStatusStudent / TStudentUpdateStatus_UPD", "ex" + ex);
                return false;
            }
        }
    }

}