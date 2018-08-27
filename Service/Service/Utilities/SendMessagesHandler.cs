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
    public class SendMessagesHandler
    {
        public static bool SendEmailOrFax(string from, string to, string subject, string body, List<Attachment> lAttach)
        {
            using (SmtpClient smtpClient = new SmtpClient())
            {
                try
                {
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