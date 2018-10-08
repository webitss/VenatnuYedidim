﻿
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
        public string nvFatherDeathDate { get; set; }
        [DataMember]
        public string nvMotherDeathDate { get; set; }
        [DataMember]
        public bool? bDeathFather { get; set; }
        [DataMember]
        public bool? bDeathMother { get; set; }
        [DataMember]
        public string iCauseOfDeathFather { get; set; }
        [DataMember]
        public string iCauseOfDeathMother { get; set; }
        [DataMember]
        public DateTime? dtAddStudentDate { get; set; }
        [DataMember]
        public string nvComment { get; set; }
        [DataMember]
        public int iStatusType { get; set; }


        #endregion

        public static bool AddStudentsToAvrech(List<T2Int> studentAndAvrechArr, int iUserId)
        {
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

        public static List<Student> GetGraduatesList(int iUserId)
        {
            try
            {


                DataRowCollection drc = SqlDataAccess.ExecuteDatasetSP("TStudentGetGraduateByUser_SLCT", new SqlParameter("iUserId", iUserId)).Tables[0].Rows;
                List<Student> students = ObjectGenerator<Student>.GeneratListFromDataRowCollection(drc);
                return students;
            }



            catch (Exception ex)
            {
                Log.LogError("GetGraduatesList / TStudentGetGraduateByUser_SLCT", "ex" + ex);
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






        public static bool AddStudent(Student student, string base64Image, int iUserId)
        {
            try
            {
                if (base64Image != "")
                    student.nvImgStudent = Fileshandler.SaveFileByBase64(base64Image, student.nvImgStudent, "Students//");
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


        public static bool UpdateStudent(Student student, string base64Image, int iUserId)
        {
            try
            {
                if (base64Image != "")
                {
                    student.nvImgStudent = Fileshandler.SaveFileByBase64(base64Image, student.nvImgStudent, "Students//");
                    DataRow dr = SqlDataAccess.ExecuteDatasetSP("TStudentGetStudentbyId_SLCT", new SqlParameter("iPersonId", student.iPersonId)).Tables[0].Rows[0];
                    string prevName = ObjectGenerator<Student>.GeneratFromDataRow(dr).nvImgStudent;
                    if (prevName != "")
                        Fileshandler.DeleteFile(prevName, "Students//");
                }

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
        public static bool UnionCards(Student student, int iStudent2)
        {
            try
            {
                List<SqlParameter> parameters = ObjectGenerator<Student>.GetSqlParametersFromObject(student);
                parameters.Add(new SqlParameter("iStudent2", iStudent2));
                SqlDataAccess.ExecuteDatasetSP("TStudentUnionCards_UPD", parameters);
                return true;
            }
            catch (Exception ex)
            {

                Log.LogError("TStudentUnionCards_UPD / TStudentUnionCards_UPD", "ex" + ex);
                return false;
            }
        }

		public static List<Yeshivot> GetYeshivotOfStudent(int iPersonId)
		{
			try
			{


				DataRowCollection drc = SqlDataAccess.ExecuteDatasetSP("TYeshivotGetYeshivotOfStudent_SLCT", new SqlParameter("iPersonId", iPersonId)).Tables[0].Rows;
				List<Yeshivot> Yeshivots = ObjectGenerator<Yeshivot>.GeneratListFromDataRowCollection(drc);
				return Yeshivots;
			}



			catch (Exception ex)
			{
				Log.LogError("GetStudentList / TStudentGetStudentByUser_SLCT", "ex" + ex);
				return null;
			}
		}



	}

}