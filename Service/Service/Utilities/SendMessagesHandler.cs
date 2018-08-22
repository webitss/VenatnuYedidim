using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Text;
using System.Web;

namespace Service.Utilities
{
    public class PhoneNumberParser
    {
        public PhoneNumberParser()
        {

        }

        public bool CanParse(string phone)
        {
            return phone.Length >= 8;
        }

        public string ConvertToSmsProviderPhone(string phone)
        {
            if (!CanParse(phone))
            {
                throw new ArgumentException("Wrong phone format!");
            }
            return "0" + phone.Substring((phone.Length - 1) - 8);
        }

    }
    public class SendMessagesHandler
    {
        //public static bool SendEmailOrFax(string from, string to, string subject, string body, List<Attachment> lAttach)
        //{
        //    using (SmtpClient smtpClient = new SmtpClient())
        //    {
        //        try
        //        {
        //            MailMessage mailObj = new MailMessage(from, to);
        //            mailObj.ReplyToList.Add(new MailAddress(from, "reply-to"));

        //            mailObj.Subject = subject;
        //            mailObj.IsBodyHtml = true;
        //            if (lAttach != null)
        //                foreach (var item in lAttach)
        //                    mailObj.Attachments.Add(item);
        //            mailObj.Body = "<div style='direction:rtl;text-align:right'>" + body + "</div>";
        //            //smtpClient.SendAsync(mailObj,null);
        //            smtpClient.Send(mailObj);
        //            return true;
        //        }
        //        catch (Exception ex)
        //        {
        //            Log.LogError(ex, "SendEmailOrFax");
        //            return false;
        //        }
        //    }
        //}

        //public static async System.Threading.Tasks.Task<string> SendSMSAsync(string content, string phone)
        //{
        //    LogWriter.WriteLog($"Sending SMS: {content} to phone {phone}");
        //    try
        //    {
        //        var settings = SmsConfiguration.Instance();
        //        using (var client = new HttpClient())
        //        {
        //            client.BaseAddress = new Uri(settings.Endpoint);
        //            var response = await client.GetAsync($"http_req.asp/?{settings.GetUrl(content, new PhoneNumberParser().ConvertToSmsProviderPhone(phone))}");
        //            if (response.IsSuccessStatusCode)
        //            {
        //                LogWriter.WriteLog("Responce status code is ok: " + response.StatusCode);
        //                var resp = await response.Content.ReadAsStringAsync();
        //                LogWriter.WriteLog(resp);
        //                return resp;
        //            }
        //            else
        //            {
        //                LogWriter.WriteLog("Responce status code is not ok: " + response.StatusCode);
        //                var resp = await response.Content.ReadAsStringAsync();
        //                LogWriter.WriteLog(resp);
        //                return null;
        //            }
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        LogWriter.Logger.Error("Failed to send SMS", ex);
        //        return null;
        //    }
        //}

        //public static string SendSMS(string senderUsername, string senderPassword, string recipientNumber, string messageText, string senderNumber)
        //{
        //    if (senderUsername != null && senderUsername != "" && senderPassword != null && senderPassword != "")
        //    {
        //        try
        //        {
        //            StringBuilder sbXml = new StringBuilder();
        //            sbXml.Append("<Inforu>");
        //            sbXml.Append("<User>");
        //            sbXml.Append("<Username>" + senderUsername + "</Username>");
        //            sbXml.Append("<Password>" + senderPassword + "</Password>");
        //            sbXml.Append("</User>");
        //            sbXml.Append("<Content Type=\"sms\">");
        //            sbXml.Append("<Message>" + "<![CDATA[" + messageText + "]]>" + "</Message>");
        //            sbXml.Append("</Content>");
        //            sbXml.Append("<Recipients>");
        //            sbXml.Append("<PhoneNumber>" + recipientNumber + "</PhoneNumber>");
        //            sbXml.Append("</Recipients>");
        //            sbXml.Append("<Settings>");
        //            sbXml.Append("<SenderNumber>" + senderNumber + "</SenderNumber>");
        //            sbXml.Append("<MessageInterval>" + 0 + "</MessageInterval>");
        //            sbXml.Append("</Settings>");
        //            sbXml.Append("</Inforu>");
        //            string strXML = HttpUtility.UrlEncode(sbXml.ToString(), System.Text.Encoding.UTF8);
        //            string result = PostDataToURL("http://api.inforu.co.il/SendMessageXml.ashx", "InforuXML=" + strXML);
        //            return result;
        //        }
        //        catch (Exception ex)
        //        {
        //            LogWriter.WriteLog(null, "senderUsername: " + senderUsername + ", " + "senderPassword: " + senderPassword + ", " +
        //                "recipientNumber: " + recipientNumber + ", " + "messageText: " + messageText + ", " + "senderNumber: " + senderNumber);
        //            LogWriter.WriteLog(ex, "SendSMS");
        //            return "Error";
        //        }
        //    }
        //    else
        //        return "OK";
        //}

        //private static string PostDataToURL(string szUrl, string szData)
        //{
        //    string szResult = string.Empty;
        //    WebRequest Request = WebRequest.Create(szUrl);
        //    Request.Timeout = 30000;
        //    Request.Method = "POST";
        //    Request.ContentType = "application/x-www-form-urlencoded";
        //    byte[] PostBuffer;
        //    try
        //    {
        //        szData = szData.Replace(" ", "+");
        //        PostBuffer = Encoding.UTF8.GetBytes(szData);
        //        Request.ContentLength = PostBuffer.Length;
        //        Stream RequestStream = Request.GetRequestStream();
        //        RequestStream.Write(PostBuffer, 0, PostBuffer.Length);
        //        RequestStream.Close();
        //        WebResponse Response;
        //        Response = Request.GetResponse();
        //        StreamReader sr = new StreamReader(Response.GetResponseStream(), Encoding.UTF8);
        //        szResult = sr.ReadToEnd();
        //        sr.Close();
        //        Response.Close();
        //        return szResult;
        //    }
        //    catch (Exception)
        //    {
        //        return szResult;
        //    }
        //}
    }
}