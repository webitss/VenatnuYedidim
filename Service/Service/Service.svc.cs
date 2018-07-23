using Service.Entities;
using Service.Utilities;
using System.Collections.Generic;

namespace Service
{
    public class Service : IService
    {
        #region Person

        //public Person GetPerson(int iPersonId)
        //{
        //    return Person.GetPerson(iPersonId);
        //}
        #endregion

        #region User

        public List<User> GetUsers(int iPersonId)
        {
            return User.GetUsers(iPersonId);
        }

        public User GetUser(int iPersonId)
        {
            return User.GetUser(iPersonId);
        }

        public User Login(string nvUserName, string nvPassword)
        {
            return User.Login(nvUserName, nvPassword);
        }

        public void SetUser(User user, int iUserId)
        {
            User.SetUser(user, iUserId);
        }

        #endregion

        #region Meeting

        public List<Meeting> GetMeetingsByStudentId(int iPersonId)
        {
            return Meeting.GetMeetingsByStudentId(iPersonId);
        }
        public bool AddMeeting(Meeting meeting, int iUserId)
        {
            return Meeting.AddMeeting(meeting, iUserId);
        }
        public bool UpdateMeeting(Meeting meeting, int iUserId)
        {
            return Meeting.UpdateMeeting(meeting, iUserId);
        }
        public bool DeleteMeeting(int iMeetingId, int iUserId)
        {
            return Meeting.DeleteMeeting(iMeetingId, iUserId);
        }

        #endregion

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


        #region Event
        public bool AddEvent(Event1 oEvent, int iUserId)
        {
            return Event1.AddEvent(oEvent, iUserId);
        }

        public List<Event1> GetEventsList(int iUserId)
        {
            return Event1.GetEventsList(iUserId);
        }

        #endregion
        #region Avrech


        public List<Avrech> GetAllAvrechim(int? iPersonId)
        {
            return Avrech.GetAllAvrechim(iPersonId);
        }

        public Avrech GetAvrechById(int? iPersonId)
        {
            return Avrech.GetAvrechById(iPersonId);
        }

        public List<Student> GetAvrechStudents(int iPersonId)
        {
            return Avrech.GetAvrechStudents(iPersonId);
        }

        public bool DeleteAvrechStudent(int iAvrechId,int iStudentId)
        {
            return Avrech.DeleteAvrechStudent(iAvrechId, iStudentId);
        }

        public bool UpdateAvrech(Avrech avrech, int iUserId)
        {
            return Avrech.UpdateAvrech(avrech, iUserId);
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
          public bool UpdateValue(SysTableRow sysTableRow)
        {
           return SysTableRow.UpdateValue(sysTableRow);
        }
        #endregion

        #region SysTables

        public List<SysTables> GetAllNames()
        {
            return SysTables.GetAllNames();
        }


        #endregion

        #region Conversation

        public List<Conversation> GetConversations(int? iPersonId)
        {
            return Conversation.GetConversations(iPersonId);
        }
        public bool AddConversations(Conversation conversation, int iUserId)
        {
            return Conversation.AddConversation(conversation, iUserId);
        }
        public bool UpdateConversations(Conversation conversation, int iUserId)
        {
            return Conversation.UpdateConversation(conversation, iUserId);
        }
        public bool DeleteConversations(int iConversationId, int iUserId)
        {
            return Conversation.DeleteConversation(iConversationId, iUserId);
        }

        #endregion

        #region yeshivot

        public List<Yeshivot> GetAllYeshivot(int iYeshivaId)
        {
            return Yeshivot.GetAllYeshivot(iYeshivaId);
        }

        public bool AddYeshiva(Yeshivot yeshiva)
        {
            return Yeshivot.AddYeshiva(yeshiva);
        }


        #endregion

        #region Documents

        #endregion


        public List<Document> GetDocuments()
        {
            return Document.GetDocuments();
        }


        #region participant

        public List<Person> GetParticipantsList(int iEventId)
        {
            return Participant.GetParticipantsList(iEventId);
        }

      
        #endregion

    }

}