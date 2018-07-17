using Service.Entities;
using Service.Utilities;
using System.Collections.Generic;

namespace Service
{
    public class Service : IService
    {
        #region User

        public List<User> GetUsersByPermittion(int iPersonId)
        {
            return User.GetUsers(iPpersonId);
        }

        public User Login(string nvUserName, string nvPassword)
        {
            return User.Login(nvUserName, nvPassword);
        }

        public void SetUser(int iPersonId, int iUserId, string nvLastName, string nvFirstName, string nvMobile, string nvEmail, string nvUserName, string nvPassword, int iPermissionType)
        {
            User.SetUser(iPersonId, iUserId, nvLastName, nvFirstName, nvMobile, nvEmail, nvUserName, nvPassword, iPermissionType);
        }

        #endregion

<<<<<<< HEAD
=======
        #region Student

        public List<Student> GetStudentList(int iUserId)
        {
            return Student.GetStudentList(iUserId);
        }


        public bool AddStudent(Student student, int iUserId)
        {
            return Student.AddStudent(student, iUserId);
        }


        public bool UpdateStudent(Student student, int iUserId)
        {
            return Student.UpdateStudent(student, iUserId);
        }


        public bool UpdateStatusStudent(int iPersonId, int iStatusType)
        {
            return Student.UpdateStatusStudent(iPersonId, iStatusType);
        }
        #endregion

>>>>>>> 4ab549154798ef6d833c5ecec50222d1087e77eb
        #region Avrech

        public bool AddEvent(Event oEvent)
        {
            return Event.AddEvent(oEvent);
        }

        //public List<Event> GetEventsList(int iUserId)
        //{
        //    return Event.GetEventsList(iUserId);
        //}

        public List<Avrech> GetAllAvrechim(int? iPersonId)
        {
            return Avrech.GetAllAvrechim(iPersonId);
        }

        public Avrech GetAvrechById(int? iPersonId)
        {
            return Avrech.GetAvrechById(iPersonId);
        }

        public bool UpdateAvrech(Avrech avrech)
        {
            return avrech.UpdateAvrech(avrech);
        }

        public List<Student> GetAvrechStudents(int iPersonId)
        {
            return Avrech.GetAvrechStudents(iPersonId);
        }

        #endregion

        #region Conversation
        public List<Conversation> GetConversations(int? iPersonId)
        {
            return Conversation.GetConversations(iPersonId);
        }

        #region files

        public string SaveFileByBase64(string base64File, string fileName)
        {
            return Fileshandler.SaveFileByBase64(base64File, fileName);
        }


        #endregion


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

<<<<<<< HEAD
        #region Conversation
        public List<Conversation> GetConversations(int? iPersonId)
        {
            return Conversation.GetConversations(iPersonId);
        }
        //public bool AddConversations( Conversation conversation, int iUserId)
        //{
        //    return Conversation.AddConversations(conversation,iUserId);
        //}


        #endregion
=======
>>>>>>> 4ab549154798ef6d833c5ecec50222d1087e77eb

        #region yeshivot

        //public List<Yeshivot> GetAllYeshivot(int iYeshivaId)
        //{
        //    return Yeshivot.GetAllYeshivot(iYeshivaId);
        //}


        //public bool AddYeshiva(Yeshivot yeshiva)
        //{
        //    return Yeshivot.AddYeshiva(yeshiva);
        //}
<<<<<<< HEAD
=======

        #endregion
        //}
>>>>>>> 4ab549154798ef6d833c5ecec50222d1087e77eb
    }
}
