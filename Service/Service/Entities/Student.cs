﻿
using Service.Utilities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Globalization;
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
        public int iAvrechId { get; set; }
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


        public static List<Student> GetBugrimList(int iUserId)
        {
            try
            {

                DataRowCollection drc = SqlDataAccess.ExecuteDatasetSP("TStudentGetBugrimByUser_SLCT", new SqlParameter("iUserId", iUserId)).Tables[0].Rows;
                List<Student> students = ObjectGenerator<Student>.GeneratListFromDataRowCollection(drc);

                return students;
            }
            catch (Exception ex)
            {
                Log.LogError("GetBugrimList / TStudentGetBugrimByUser_SLCT", "ex" + ex);
                return null;
            }
        }
        public static Dictionary<int, int> GetStudentsAssociatedToAvrechim()
		{
			try
			{
                Dictionary<int, int> studentsId = new Dictionary<int, int>();
                DataRowCollection drc = SqlDataAccess.ExecuteDatasetSP("TAvrechStudents_SLCT").Tables[0].Rows;
                foreach (DataRow row in drc)
                {
                    
                    studentsId.Add(int.Parse(row["iStudentId"].ToString()), int.Parse(row["iAvrechId"].ToString()));
                }
                return studentsId;                
			}
			catch (Exception ex)
			{
				Log.LogError("GetStudentsAssociatedToAvrechim / TAvrechStudents_SLCT", "ex" + ex);
				return null;
			}
		}
		public static Dictionary<int,string> GetCurrentYeshivaOfStudent()
		{
			try
			{
                Dictionary<int, string> studentsId = new Dictionary<int, string>();
                DataRowCollection drc = SqlDataAccess.ExecuteDatasetSP("TYeshivot_Last_SLCT").Tables[0].Rows;
                foreach (DataRow r in drc)
                {
                    studentsId.Add(int.Parse(r["iPersonId"].ToString()), r["nvYeshivaName"].ToString());
                }
				
				return studentsId;
			}
			catch (Exception ex)
			{
				Log.LogError("GetStudentList / TAvrechStudents_SLCT", "ex" + ex);
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

        public static List<Student> GetStudentsByAvrechId(int iAvrechId)
        {
            try
            {
                DataRowCollection drc = SqlDataAccess.ExecuteDatasetSP("TStudent_ByAvrechId_SLCT", new SqlParameter("iPersonId", iAvrechId)).Tables[0].Rows;
                List<Student> students = ObjectGenerator<Student>.GeneratListFromDataRowCollection(drc);
                return students;
            }
            catch (Exception ex)
            {
                Log.LogError("GetStudentsByAvrechId / TStudent_ByAvrechId_SLCT", "ex" + ex);
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
                List<SqlParameter> parameters2 = new List<SqlParameter>();
                parameters2.Add(new SqlParameter("iAvrechId", parameters.Find(x => x.ParameterName == "iAvrechId").Value));
                parameters.Remove(parameters.Find(x => x.ParameterName == "iAvrechId"));

                parameters.Add(new SqlParameter("iUserId", iUserId));
                DataRow dr=SqlDataAccess.ExecuteDatasetSP("TStudent_INS", parameters).Tables[0].Rows[0];
                int id = int.Parse(dr.ItemArray[0].ToString());
                parameters2.Add(new SqlParameter("iStudentId", id));
                parameters2.Add(new SqlParameter("iUserId", iUserId));
                SqlDataAccess.ExecuteDatasetSP("TAvrechStudents_INS", parameters2);
                return true;

            }
            catch (Exception ex)
            {
                Log.LogError("AddStudent / TStudent_INS", "ex" + ex);
                return false;
            }
        }
        public static bool DeleteStudent(int iPersonId, int iUserId)
        {
            try
            {
                List<SqlParameter> parameters = new List<SqlParameter>();
                parameters.Add(new SqlParameter("iStudent", iPersonId));
                parameters.Add(new SqlParameter("iUserId", iUserId));
                SqlDataAccess.ExecuteDatasetSP("TStudent_DEL", parameters);

                return true;
            }
            catch (Exception ex)
            {
                Log.LogError("DeleteStudent / TStudent_INS", "ex" + ex);
                return false;
            }
        }


        

        public static bool UpdateStudent(Student student, string base64Image, int iUserId)
        {
            try
            {
                if (base64Image != "")
                {                                     
                    student.nvImgStudent = Fileshandler.SaveFileByBase64(base64Image, student.nvImgStudent);
                    DataRow dr = SqlDataAccess.ExecuteDatasetSP("TStudentGetStudentbyId_SLCT", new SqlParameter("iPersonId", student.iPersonId)).Tables[0].Rows[0];
                    string prevName = ObjectGenerator<Student>.GeneratFromDataRow(dr).nvImgStudent;
                    if (prevName != "")
                        Fileshandler.DeleteFile(prevName, "Students//");
                }

                List<SqlParameter> parameters = ObjectGenerator<Student>.GetSqlParametersFromObject(student);
                List<SqlParameter> parameters2 = new List<SqlParameter>();
                parameters.Add(new SqlParameter("iUserId", iUserId));
                parameters2.Add(new SqlParameter("iAvrechId", parameters.Find(x => x.ParameterName == "iAvrechId").Value));
                parameters2.Add(new SqlParameter("iStudentId", student.iPersonId));
                parameters2.Add(new SqlParameter("iUserId", iUserId));
                parameters.Remove(parameters.Find(x => x.ParameterName == "iAvrechId"));
                SqlDataAccess.ExecuteDatasetSP("TStudent_UPD", parameters);
                SqlDataAccess.ExecuteDatasetSP("TAvrechStudent_INS_UPD", parameters2);
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

                Log.LogError("UnionCards / TStudentUnionCards_UPD", "ex" + ex);
                return false;
            }
        }
        public static string castEbrewToForeign(string hebrewDate)
        {
            try
            {
                HebrewCalendar hc = new HebrewCalendar();
                
                DateTime d = new DateTime(1998, 08, 15);
                return "f";
            }
            catch (Exception ex)
            {
                Log.LogError("error");
                return null;
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
				Log.LogError("GetYeshivotOfStudent / TYeshivotGetYeshivotOfStudent_SLCT", "ex" + ex);
				return null;
			}
		}

        public static Dictionary<int,string> GetCitiesOfYeshivotOfStudents()
        {
            try
            {
                DataRowCollection drc = SqlDataAccess.ExecuteDatasetSP("TYeshivotOfStudents_SLCT").Tables[0].Rows;
                Dictionary<int, string> cities = new Dictionary<int, string>();
                foreach (DataRow r in drc)
                {
                    cities.Add(int.Parse(r["iPersonId"].ToString()), r["nvCity"].ToString());
                }

                return cities;
            }
            catch (Exception ex)
            {
                Log.LogError("GetCitiesOfYeshivotOfStudents / TYeshivotOfStudents_SLCT", "ex" + ex);
                return null;
            }
        }

    //   public static  bool DeleteStudent(int iPersonId, int iUserId)
    //    {
    //        try
    //        {
    //            List<SqlParameter> parameters=new List<SqlParameter>();
    //            parameters.Add(new SqlParameter("iStudent", iPersonId));
    //            parameters.Add(new SqlParameter("iUserId", iUserId));

    //            SqlDataAccess.ExecuteDatasetSP("TStudent_DEL", parameters);
    //            return true;
    //        }
    //        catch (Exception ex)
    //        {

    //            Log.LogError("TStudent_DEL / TStudent_DEL", "ex" + ex);
    //            return false;
    //        }
    //    }


}

}