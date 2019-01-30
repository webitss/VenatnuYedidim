using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Text;
using System.Web;
using Service.Entities;

namespace Service.Utilities
{
    public class SendMessagesHandler
    {
        public static bool SendEmailOrFax(string from, string to, string subject, string body, List<Attachment> lAttach)
        {
            
            using (SmtpClient smtpClient = new SmtpClient())
            {
                try
                {
                    
                    smtpClient.Credentials = new System.Net.NetworkCredential()
                    {
                        UserName = ConfigSettings.ReadSetting("Email"),
                        Password = ConfigSettings.ReadSetting("passwordMail")
                    };
                    smtpClient.EnableSsl = true;
                    
                    System.Net.ServicePointManager.ServerCertificateValidationCallback = delegate (object s,
                            System.Security.Cryptography.X509Certificates.X509Certificate certificate,
                            System.Security.Cryptography.X509Certificates.X509Chain chain,
                            System.Net.Security.SslPolicyErrors sslPolicyErrors)
                    {
                        return true;
                    };



                    MailMessage mailObj = new MailMessage(from, to);
                    mailObj.ReplyToList.Add(new MailAddress(from, "reply-to"));

                    mailObj.Subject = subject;
                    mailObj.IsBodyHtml = true;
                    if (lAttach != null)
                        foreach (var item in lAttach)
                            mailObj.Attachments.Add(item);
                    mailObj.Body = "<div style='direction:rtl;text-align:right'>" + body + "</div>";
                    //smtpClient.SendAsync(mailObj,null);
                    smtpClient.Send(mailObj);
                    return true;
                }
                catch (Exception ex)
                {
                    Log.LogError("SendEmailOrFax", "ex" + ex);
                    return false;
                }
            }
        }
    }
}