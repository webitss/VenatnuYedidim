using System;
using System.IO;

namespace Service.Utilities
{
    public class Log
    {
        public static void LogInfo(string text)
        {
            try
            {
                StreamWriter w = new StreamWriter(AppDomain.CurrentDomain.BaseDirectory + "Logs\\" + DateTime.Now.Date.ToString("yyyy.MM.dd") + ".txt", true);
                w.WriteLine(DateTime.Now.ToString("yyyy/MM/dd hh:mm:ss") + " - Info - " + text);
                w.Close();
            }
            catch (Exception e) { }
        }

        public static void LogError(string functionName, string exception = "")
        {
            try
            {
                StreamWriter w = new StreamWriter(AppDomain.CurrentDomain.BaseDirectory + "Logs\\" + DateTime.Now.Date.ToString("yyyy.MM.dd") + ".txt", true);
                w.WriteLine(DateTime.Now.ToString("yyyy/MM/dd hh:mm:ss") + " - Error - " + functionName + " - " + exception);
                w.Close();
            }
            catch (Exception e) { }
        }
    }
}
