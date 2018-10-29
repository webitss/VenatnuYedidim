using Service.Utilities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;
using System.Net.Mail;
using System.Text;

namespace Service.Entities
{

	[DataContract]
	public class Avrech : Person
	{
		public static List<Avrech> GetAllAvrechim(int? iPersonId)
		{
			try
			{
				DataRowCollection drc = SqlDataAccess.ExecuteDatasetSP("TAvrech_SLCT", new SqlParameter("iPersonId", iPersonId)).Tables[0].Rows;
				List<Avrech> avrech = ObjectGenerator<Avrech>.GeneratListFromDataRowCollection(drc);

				return avrech;
			}
			catch (Exception ex)
			{
				Log.LogError("GetAvrechim / TAvrech_SLCT", ", ex " + ex);
				return null;
			}
		}

		public static List<Student> GetAvrechStudents(int iPersonId)
		{
			try
			{
				DataRowCollection drc = SqlDataAccess.ExecuteDatasetSP("TStudent_ByAvrechId_SLCT", new SqlParameter("iPersonId", iPersonId)).Tables[0].Rows;
				List<Student> students = ObjectGenerator<Student>.GeneratListFromDataRowCollection(drc);
				return students;
			}
			catch (Exception ex)
			{
				Log.LogError("GetAvrechStudents / TAvrechStudents_ByAvrechId_SLCT", ", ex " + ex);
				return null;
			}
		}

		public static bool DeleteAvrechStudent(int iAvrechId, int iStudentId)
		{
			try
			{
				SqlDataAccess.ExecuteDatasetSP("TAvrechStudents_DEL", new SqlParameter("iAvrechId", iAvrechId), new SqlParameter("iStudentId", iStudentId));
				return true;
			}
			catch
			{
				return false;
			}
		}

		public static Avrech GetAvrechById(int? iPersonId)
		{
			try
            {
                if (iPersonId != null)
                {
                    DataRow dr = SqlDataAccess.ExecuteDatasetSP("TAvrech_GetAvrechById_SLCT", new SqlParameter("iPersonId", iPersonId)).Tables[0].Rows[0];
                    Avrech avrech = ObjectGenerator<Avrech>.GeneratFromDataRow(dr);
                    avrech.lstObject = new Dictionary<string, string>();
                    avrech.lstObject.Add("nvUserName", dr["nvUserName"].ToString());
                    avrech.lstObject.Add("nvPassword", dr["nvPassword"].ToString());

                    return avrech;
                }
                else return null;
			}
			catch (Exception ex)
			{
				Log.LogError("GetAvrechim / TAvrech_SLCT", ", ex " + ex);
				return null;
			}
		}

		public static bool UpdateAvrech(Avrech avrech, int iUserId)
		{
			try
			{

				if (avrech.iPersonId == 0)
				{
					List<SqlParameter> parameters = ObjectGenerator<Avrech>.GetSqlParametersFromObject(avrech);
					parameters.Remove(parameters.Find(x => x.ParameterName == "iPersonId"));
					parameters.Add(new SqlParameter("iUserId", iUserId));
					var id=SqlDataAccess.ExecuteDatasetSP("TPerson_INS", parameters).Tables[0].Rows[0].ItemArray[0];


					List<SqlParameter> param = new List<SqlParameter>();
					param.Add(new SqlParameter("iUserId", iUserId));
					param.Add(new SqlParameter("iPersonId", id));
					SqlDataAccess.ExecuteDatasetSP("TAvrech_INS", param);

				}
				else
				{
					List<SqlParameter> parameters = ObjectGenerator<Avrech>.GetSqlParametersFromObject(avrech);
					parameters.Add(new SqlParameter("iUserId", iUserId));
					SqlDataAccess.ExecuteDatasetSP("TPerson_UPD", parameters);
				}


				return true;
			}
			catch (Exception ex)
			{
				Log.LogError("UpdateAvrech / TPerson_UPD", "ex" + ex);
				return false;
			}
		}

		public static bool DeleteAvrech(int iPersonId)
		{
			try
			{
				SqlDataAccess.ExecuteDatasetSP("TAvrech_DEL", new SqlParameter("iPersonId", iPersonId));
				return true;
			}
			catch
			{
				return false;
			}
		}



		public static bool UpdateUserNameAndPassword(int iPersonId, string nvUserName, string nvPassword, int iUserId)
		{
			try
			{
				List<SqlParameter> parameters = new List<SqlParameter>();
				parameters.Add(new SqlParameter("iPersonId", iPersonId));
				parameters.Add(new SqlParameter("nvUserName", nvUserName));
				parameters.Add(new SqlParameter("nvPassword", nvPassword));
				parameters.Add(new SqlParameter("iUserId", iUserId));
				SqlDataAccess.ExecuteDatasetSP("TUser_userNameAndPassword_UPD", parameters);
				return true;
			}
			catch (Exception ex)
			{
				Log.LogError("UpdateAvrech / TPerson_UPD", "ex" + ex);
				return false;
			}
		}



	
        public static bool MailToAvrechim(string[] mailList, string subject, string body)
        {

            bool flag = false;
            foreach (var mail in mailList)
            {
                SendMessagesHandler.SendEmailOrFax(ConfigSettings.ReadSetting("Email"), mail, subject, body, null);



                //SmtpClient client = new SmtpClient();
                //client.Port = 587;
                //client.Host = "smtp.gmail.com";
                //client.EnableSsl = true;
                //client.Timeout = 10000;
                //client.DeliveryMethod = SmtpDeliveryMethod.Network;
                //client.UseDefaultCredentials = false;
                //client.Credentials = new System.Net.NetworkCredential("", "");
                //MailMessage mm = new MailMessage("VenatnuYedidimSystem@gmail.com", mail);
                //mm.Subject = "ונתנו ידידים";
                //mm.Body = "אברך";
                //System.Net.Mail.Attachment attachment;
                //// attachment = new System.Net.Mail.Attachment("");
                ////  mm.Attachments.Add(attachment);
                //mm.BodyEncoding = UTF8Encoding.UTF8;
                //mm.DeliveryNotificationOptions = DeliveryNotificationOptions.OnFailure;

                //client.Send(mm);
            }

           
            return true;
        }
        public static List<Avrech> GetAvrechimByStudentId(int iPersonId)

		{
			try
			{
				DataRowCollection drc = SqlDataAccess.ExecuteDatasetSP("TAvrech_GetAvrechimOfStudent_SLCT", new SqlParameter("iPersonId", iPersonId)).Tables[0].Rows;
				List<Avrech> avrech = ObjectGenerator<Avrech>.GeneratListFromDataRowCollection(drc);
				return avrech;
			}
			catch (Exception ex)
			{
				Log.LogError("GetAvrechimByStudentId / TAvrech_GetAvrechimOfStudent_SLCT", ", ex " + ex);
				return null;
			}


		}


	}
}

       
      

