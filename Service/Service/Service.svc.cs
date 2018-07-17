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
<<<<<<< HEAD
        //#region SysTables
=======
        #region SysTables
>>>>>>> 3c53cb33dd536c77e4e3aeb2b0bc4d6127062913
        //public List<SysTables> GetAllNames(int iSysTableId)
        //{
        //    return SysTables.GetAllNames();
        //}
<<<<<<< HEAD
        //#endregion
=======
        #endregion
>>>>>>> 3c53cb33dd536c77e4e3aeb2b0bc4d6127062913
        #region Conversation
        public List<Conversation> GetConversations(int? iPersonId)
        {
            return Conversation.GetConversations(iPersonId);
        }

        #endregion

    }


    public bool AddYeshiva(Yeshivot yeshiva)
    {
        return Yeshivot.AddYeshiva(yeshiva.nvYeshivaName, yeshiva.nvAddress, 
            yeshiva.nvCity, yeshiva.nvContact, yeshiva.nvRoleType, yeshiva.nvEmail, yeshiva.nvMobile);
    }

    public List<Yeshivot> GetAllYeshivot(int iYeshivaId)
    {
        return Yeshivot.GetAllYeshivot(iYeshivaId);
    }
}
