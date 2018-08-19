using Service.Entities;
using Service.Utilities;
using System;
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

        public bool SetUser(User user, int iUserId)
        {
            return User.SetUser(user, iUserId);
        }

        #endregion

        #region Meeting

        public List<Meeting> GetMeetingsByStudentId(int iPersonId)
        {
            return Meeting.GetMeetingsByStudentId(iPersonId);
        }
        //public bool AddMeeting(Meeting meeting, int iUserId)
        //{
        //    return Meeting.SetMeeting(meeting, iUserId);
        //}

        public bool SetMeeting(Meeting meeting, int iUserId)
        {
            return Meeting.SetMeeting(meeting, iUserId);
        }


        //public bool UpdateMeeting(Meeting meeting, int iUserId)
        //{
        //    return Meeting.UpdateMeeting(meeting, iUserId);
        //}
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

        public Student GetStudentById( int iUserId)
        {
            return Student.GetStudentById( iUserId);
        }
        
        public  bool AddStudentsToAvrech(List<T2Int> studentAndAvrechArr, int iUserId)
        {
            return Student.AddStudentsToAvrech(studentAndAvrechArr, iUserId);
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
        public bool SetEvent(Event1 oEvent, int iUserId, List<TInt> to)
        {
            return Event1.SetEvent(oEvent, iUserId,to);
        }

        public List<Event1> GetEventsList(int iUserId)
        {
            return Event1.GetEventsList(iUserId);
        }

        public Event1 GetEvent(int? iEventId)
        {
            return Event1.GetEvent(iEventId);
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

        public bool DeleteAvrechStudent(int iAvrechId, int iStudentId)
        {
            return Avrech.DeleteAvrechStudent(iAvrechId, iStudentId);
        }


        public bool UpdateAvrech(Avrech avrech, int iUserId)
        {
            return Avrech.UpdateAvrech(avrech, iUserId);
        }

        public bool UpdateUserNameAndPassword(int iPersonId, string nvUserName, string nvPassword, int iUserId)
        {
            return Avrech.UpdateUserNameAndPassword(iPersonId, nvUserName, nvPassword, iUserId);
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
        public bool AddValue(SysTableRow sysTableRow)
        {
            return SysTableRow.AddValue(sysTableRow);
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
        public bool AddConversations(Conversation conversation, int iPersonId)
        {
            return Conversation.AddConversation(conversation, iPersonId);
        }
        public bool UpdateConversations(Conversation conversation, int iPersonId)
        {
            return Conversation.UpdateConversation(conversation, iPersonId);
        }
        public bool DeleteConversations(int iConversationId, int iPersonId)
        {
            return Conversation.DeleteConversation(iConversationId, iPersonId);
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

        public bool EditYeshiva(Yeshivot yeshiva, int iYeshivaId)
        {
            return Yeshivot.EditYeshiva(yeshiva,iYeshivaId);
        }

        public Yeshivot getYeshivaById(int iYeshivaId)
        {
            return Yeshivot.getYeshivaById(iYeshivaId);
        }

        #endregion

        #region Documents
        public List<Document> GetDocuments()
        {
            return Document.GetDocuments();
        }
        public string SaveFileByBase64(string base64File, string fileName)
        {
            return Fileshandler.SaveFileByBase64(base64File, fileName);
        }

        //public bool AddFile(int iItemId, int iBelongingType, int iCategoryType, string nvBase64File, string nvFileName, string nvComment)
        //{
        //    return Document.AddFile(iItemId, iBelongingType, iCategoryType, nvBase64File, nvFileName, nvComment);
        //}
        public bool SetDocument(Document document, string nvBase64File)
        {
            return Document.SetDocument(document, nvBase64File);
        }
       
        
        public List<Document> GetDocumentsByItemId(int iItemId)
        {
            return Document.GetDocumentsByItemId(iItemId);
        }

        #endregion

        #region participant

        public List<Person> GetParticipantsList(int iEventId)
        {
            return Participant.GetParticipantsList(iEventId);
        }

        public List<Student> GetGraduatesList(int iUserId)
        {
            //throw new NotImplementedException();
            return Student.GetGraduatesList(iUserId);
        }

        #endregion

    }
}