using Service.Entities;
using Service.Utilities;
using System.Collections.Generic;

namespace Service
{
    public class Service : IService
    {
        #region User

        public List<User> GetUsersByPermittion(int personId)
        {
            return User.GetUsers(personId);
        }

        public User Login(string nvUserName, string nvPassword)
        {
            return User.Login(nvUserName, nvPassword);
        }

        public void SetUser(int iPersonId, int iUserId, string nvLastName, string nvFirstName, string nvPhone, string nvEmail, string nvUserName, string nvPassword, int iPermissionType)
        {
            User.SetUser(iPersonId, iUserId, nvLastName, nvFirstName, nvPhone, nvEmail, nvUserName, nvPassword, iPermissionType);
        }

        #endregion

        #region Avrech

        public List<Avrech> GetAllAvrechim(int? iPersonId)
        {
            return Avrech.GetAllAvrechim(iPersonId);
        }

        public List<Student> GetAvrechStudents(int iPersonId)
        {
            return Avrech.GetAvrechStudents(iPersonId);
        }

        public Avrech GetAvrechById(int? iPersonId)
        {
            return Avrech.GetAvrechById(iPersonId);
        }


        public List<Conversation> GetConversations(int iPersonId)
        {
            return Conversation.GetConversations(iPersonId);
        }

        #endregion


        #region files

        public string SaveFileByBase64(string base64File, string fileName)
        {
            return Fileshandler.SaveFileByBase64(base64File, fileName);
        }


        #endregion
        #region SysTableRow
        public List<SysTableRow> GetValues(int iSysTableId)
        {
            return SysTableRow.GetValues(iSysTableId);
        }
        #endregion
        #region SysTables
        //public List<SysTables> GetAllNames(int iSysTableId)
        //{
        //    return SysTables.GetAllNames();
        //}
        #endregion


    }

    //public bool AddYeshiva(Yeshivot yeshiva)
    //{
    //    return Yeshivot.AddYeshiva();
    //}
}
