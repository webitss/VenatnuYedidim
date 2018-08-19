using Service.Entities;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace Service.Utilities
{
    public class Fileshandler
    {
        public static string SaveFileByBase64(string base64File, string fileName, string folderPath = "")
        {
            try
            {
                if (base64File.IndexOf(";base64,") != -1)
                {
                    // Create a new folder, if necessary.
                    if (!Directory.Exists(@AppDomain.CurrentDomain.BaseDirectory + ConfigSettings.ReadSetting("FileFolderPath") + folderPath))
                        Directory.CreateDirectory(@AppDomain.CurrentDomain.BaseDirectory + ConfigSettings.ReadSetting("FileFolderPath") + folderPath);

                    if (fileName == null || fileName == "")
                        fileName = Guid.NewGuid() + "." + base64File.Substring(base64File.IndexOf('/') + 1, base64File.IndexOf(';') - (base64File.IndexOf('/') + 1));
                    else
                    {
                        int index = 1;
                        string newFilename = fileName;
                        while (File.Exists(@AppDomain.CurrentDomain.BaseDirectory + ConfigSettings.ReadSetting("FileFolderPath") + folderPath + newFilename))
                        {
                            newFilename = fileName.Split('.')[0] + "(" + index + ")" + (fileName.Split('.').Length > 1 ? "." + fileName.Split('.')[1] : "");
                            index++;
                        }
                        fileName = newFilename;
                    }

                    string sPath = AppDomain.CurrentDomain.BaseDirectory + ConfigSettings.ReadSetting("FileFolderPath") + folderPath + fileName;
                    byte[] array = Convert.FromBase64String(base64File.Substring(base64File.IndexOf(",") + 1));
                    File.WriteAllBytes(sPath, array);

                    return fileName;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                Log.LogError("SaveFileByBase64", "fileName: " + fileName + ", folderPath: " + folderPath + ", base64File: " + base64File + ", ex: " + ex.Message);
                return null;
            }
        }

        public static bool DeleteFile(string fileName, string folderPath = "")
        {
            try
            {
                if (fileName != "" && fileName != null && File.Exists(@AppDomain.CurrentDomain.BaseDirectory + ConfigSettings.ReadSetting("FileFolderPath") + folderPath + fileName))
                {
                    File.Delete(AppDomain.CurrentDomain.BaseDirectory + @ConfigSettings.ReadSetting("FileFolderPath") + folderPath + fileName);
                    return true;
                }
                return false;
            }
            catch (IOException ex)
            {
                Log.LogError("DeleteFile", "fileName: " + folderPath + fileName + ", ex: " + ex.Message);
                return false;
            }
        }

        public static Dictionary<string, string> CopyFile(string fileName, string subSrcFolderPath, string subTargetFolderPath)
        {
            try
            {
                Dictionary<string, string> result = new Dictionary<string, string>(2);

                if (fileName != null || fileName != "")
                {

                    string sourcePath = @AppDomain.CurrentDomain.BaseDirectory + ConfigSettings.ReadSetting("FileFolderPath") + subSrcFolderPath;
                    string targetPath = @AppDomain.CurrentDomain.BaseDirectory + ConfigSettings.ReadSetting("FileFolderPath") + subTargetFolderPath;

                    // Use Path class to manipulate file and directory paths.
                    string sourceFile = Path.Combine(sourcePath, fileName);
                    if (File.Exists(sourceFile) == false)
                    {
                        result.Add("newFileName", fileName);
                        result.Add("newFileType", "");
                        return result;
                    }
                    int index = 1;
                    string newFilename = fileName;
                    while (File.Exists(@AppDomain.CurrentDomain.BaseDirectory + ConfigSettings.ReadSetting("FileFolderPath") + subTargetFolderPath + newFilename))
                    {
                        newFilename = fileName.Split('.')[0] + "(" + index + ")" + (fileName.Split('.').Length > 1 ? "." + fileName.Split('.')[1] : "");
                        index++;
                    }
                    string destFile = Path.Combine(targetPath, newFilename);

                    // To copy a folder's contents to a new location:
                    // Create a new target folder, if necessary.
                    if (!Directory.Exists(targetPath))
                        Directory.CreateDirectory(targetPath);

                    // To copy a file to another location and 
                    // overwrite the destination file if it already exists.
                    File.Copy(sourceFile, destFile, false);
                    result.Add("newFileName", newFilename);
                    result.Add("newFileType", GetMimeType(newFilename));

                    return result;
                }
                else
                {
                    throw (new Exception("fileName is empty"));
                }
            }
            catch (Exception ex)
            {
                Log.LogError("CopyFile", "fileName: " + fileName + ", subSrcFolderPath: " + subSrcFolderPath + ", subTargetFolderPath: " + subTargetFolderPath + ", ex: " + ex.Message);
                return null;
            }
        }

        private static string GetMimeType(string fileName)
        {
            string mimeType = "application/unknown";
            string ext = Path.GetExtension(fileName).ToLower();
            Microsoft.Win32.RegistryKey regKey = Microsoft.Win32.Registry.ClassesRoot.OpenSubKey(ext);
            if (regKey != null && regKey.GetValue("Content Type") != null)
                mimeType = regKey.GetValue("Content Type").ToString();
            return mimeType;
        }

        public static bool DeleteFolder(string subSrcFolderPath)
        {
            try
            {
                string sourcePath = @AppDomain.CurrentDomain.BaseDirectory + ConfigSettings.ReadSetting("FileFolderPath") + subSrcFolderPath;

                if (Directory.Exists(sourcePath))
                {
                    string[] files = Directory.GetFiles(sourcePath);
                    foreach (string name in files)
                    {
                        File.Delete(name);
                    }
                    Directory.Delete(sourcePath);
                    return true;
                }
                else
                {
                    return true;
                }
            }
            catch (Exception ex)
            {
                Log.LogError("DeleteFolder", " subSrcFolderPath: " + subSrcFolderPath + ", ex: " + ex.Message);
                return false;
            }
        }     

        public static bool CopyFolder(string subSrcFolderPath, string subTargetFolderPath)
        {
            try
            {
                string sourcePath = @AppDomain.CurrentDomain.BaseDirectory + ConfigSettings.ReadSetting("FileFolderPath") + subSrcFolderPath;
                string targetPath = @AppDomain.CurrentDomain.BaseDirectory + ConfigSettings.ReadSetting("FileFolderPath") + subTargetFolderPath;

                // To copy all the files in one directory to another directory.
                // Get the files in the source folder. (To recursively iterate through
                // all subfolders under the current directory, see
                // "How to: Iterate Through a Directory Tree.")
                // Note: Check for target path was performed previously
                //       in this code example.
                if (Directory.Exists(sourcePath))
                {
                    string[] files = Directory.GetFiles(subSrcFolderPath);
                    string fileName;
                    // Copy the files and overwrite destination files if they already exist.
                    foreach (string s in files)
                    {
                        // Use static Path methods to extract only the file name from the path.
                        fileName = Path.GetFileName(s);
                        string destFile = Path.Combine(targetPath, fileName);
                        File.Copy(s, destFile, true);
                    }
                    return true;
                }
                else
                {
                    throw (new Exception("fileName is empty"));
                }
            }
            catch (Exception ex)
            {
                Log.LogError("CopyFolder", " subSrcFolderPath: " + subSrcFolderPath + ", subTargetFolderPath: " + subTargetFolderPath + ", ex: " + ex.Message);
                return false;
            }
        }

        public static bool CleanFolder(List<string> lstFileName, string folderPath)
        {
            try
            {
                string sourcePath = @AppDomain.CurrentDomain.BaseDirectory + ConfigSettings.ReadSetting("FileFolderPath") + folderPath;

                if (Directory.Exists(sourcePath))
                {
                    DirectoryInfo d = new DirectoryInfo(sourcePath);
                    FileInfo[] files = d.GetFiles("*");
                    foreach (FileInfo file in files)
                    {
                        if (lstFileName.FirstOrDefault(f => f == file.Name) == null)
                            File.Delete(file.FullName);
                    }
                    return true;

                }
                else
                {
                    return true;
                }
            }
            catch (Exception ex)
            {
                Log.LogError("CleanFolder", " lstFileName: " + lstFileName + ", folderPath: " + folderPath + ", ex: " + ex.Message);
                return false;
            }
        }
    }
}