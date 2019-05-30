using Service.Entities;
using Service.Utilities;
using System;
using System.Collections.Generic;
using System.Net.Mail;

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

        public bool DeleteUser(int iPersonId, int iUserId)
        {

            return User.DeleteUser(iPersonId, iUserId);

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

        public List<Meeting> GetMeetingsByAvrechId(int iAvrechId)
        {
            return Meeting.GetMeetingsByAvrechId(iAvrechId);
        }

        public int SetMeeting(Meeting meeting, int iUserId)
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

        #region Task

        public bool SetTask(Task task, int iUserId)
        {
            return Task.SetTask(task, iUserId);
        }

        public List<Task> GetTasksByPersonId(int iPersonId)
        {
            return Task.GetTasksByPersonId(iPersonId);
        }

        public List<Task> GetTasksByPersonIdBetweenDates(int iPersonId, DateTime fromDate, DateTime toDate)
        {
            return Task.GetTasksByPersonIdBetweenDates(iPersonId,fromDate,toDate);
        }

        public bool DeleteTask(int iTaskId, int iPersonId)
        {
            return Task.DeleteTask(iTaskId, iPersonId);
        }

        #endregion

        #region Student

        public List<Student> GetStudentList(int iUserId)
        {
            return Student.GetStudentList(iUserId);
        }
        public List<Student> GetBugrimList(int iUserId)
        {
            return Student.GetBugrimList(iUserId);
        }
        public Dictionary<int,int> GetStudentsAssociatedToAvrechim()
        {
            return Student.GetStudentsAssociatedToAvrechim();
        }
        public Dictionary<int, string> GetCurrentYeshivaOfStudent()
        {
            return Student.GetCurrentYeshivaOfStudent();
        }

        public List<Yeshivot> GetYeshivotOfStudent(int iPersonId)
        {
            return Student.GetYeshivotOfStudent(iPersonId);
        }

        public Dictionary<int,string> GetCitiesOfYeshivotOfStudents()
        {
            return Student.GetCitiesOfYeshivotOfStudents();
        }

        public Student GetStudentById(int iUserId)
        {
            return Student.GetStudentById(iUserId);
        }
        public List<Student> GetStudentsByAvrechId(int iAvrechId)
        {
            return Student.GetStudentsByAvrechId(iAvrechId);
        }

        public bool AddStudentsToAvrech(List<T2Int> studentAndAvrechArr, int iUserId)
        {
            return Student.AddStudentsToAvrech(studentAndAvrechArr, iUserId);
        }

        public bool AddStudent(Student student, string base64Image, int iUserId)
        {
            return Student.AddStudent(student, base64Image, iUserId);
        }


        public bool UpdateStudent(Student student, string base64Image, int iUserId)
        {
            return Student.UpdateStudent(student, base64Image, iUserId);
        }

        public string castEbrewToForeign(string d)
        {
            return Student.castEbrewToForeign(d);
        }


        public bool UpdateStatusStudent(int iPersonId, int iStatusType)
        {
            return Student.UpdateStatusStudent(iPersonId, iStatusType);
        }

        public bool UnionCards(Student student, int iStudent2)
        {
            return Student.UnionCards(student, iStudent2);
        }
        public bool DeleteStudent(int iPersonId, int iUserId)
        {
            return Student.DeleteStudent(iPersonId, iUserId);
        }
        

        #endregion

        #region Event
        public bool SetEvent(Event1 oEvent, int iUserId, List<TInt> to)
        {
            return Event1.SetEvent(oEvent, iUserId, to);
        }

        public List<Event1> GetEventsList()
        {
            return Event1.GetEventsList();
        }

        public Event1 GetEvent(int? iEventId)
        {
            return Event1.GetEvent(iEventId);
        }


        public bool DeleteEvent(int iEventId, int iUserId)
        {
            return Event1.DeleteEvent(iEventId, iUserId);
        }

        public List<Event1> GetEventsByStudent(int iPersonId)
        {
            return Event1.GetEventsByStudent(iPersonId);
        }
        #endregion

        #region Avrech

        //public bool AddAvrechToStudent(int iStudentId, int iAvrechId, int iUserId)
        //{
        //    return Avrech.AddAvrechToStudent(iStudentId, iAvrechId, iUserId);
        //}
        public List<Avrech> GetAllAvrechim(int? iPersonId)
        {
            return Avrech.GetAllAvrechim(iPersonId);
        }
          
        public int  GetAvrechIdByStudentId (int iStudentId)
        {
            return Avrech.GetAvrechIdByStudentId(iStudentId);
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
        public bool DeleteAvrech(int iPersonId)
        {
            return Avrech.DeleteAvrech(iPersonId);
        }

        public List<Avrech> GetAvrechByStudentId(int iPersonId)
        {
            return Avrech.GetAvrechByStudentId(iPersonId);
        }


        public bool MailToAvrechim(string[] mailList, string subject, string body)
        {
            return Avrech.MailToAvrechim(mailList, subject, body);
        }

       public Avrech GetAllAvrechimByStudent(int iPersonId)
        {
            return Avrech.GetAllAvrechimByStudent(iPersonId);
        }
        #endregion




        #region SysTableRow
        public List<SysTableRow> GetValues(int iSysTableId)
        {

            return SysTableRow.GetValues(iSysTableId);
        }
        public bool UpdateValue(SysTableRow sysTableRow, int iUserId)
        {
            return SysTableRow.UpdateValue(sysTableRow, iUserId);
        }
        public bool AddValue(SysTableRow sysTableRow, int iUserId)
        {
            return SysTableRow.AddValue(sysTableRow, iUserId);
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
        public List<Conversation> GetConversationsByAvrechId(int iAvrechId)
        {
            return Conversation.GetConversationsByAvrechId(iAvrechId);
        }
        public int SetConversations(Conversation conversation,Task task, int iUserId)
        {
            return Conversation.SetConversations(conversation,task, iUserId);
        }
        //public bool AddConversations(Conversation conversation, int iPersonId)
        //{
        //    return Conversation.AddConversation(conversation, iPersonId);
        //}
        //public bool UpdateConversations(Conversation conversation, int iPersonId)
        //{
        //    return Conversation.UpdateConversation(conversation, iPersonId);
        //}
        public bool DeleteConversations(int iConversationId, int iUserId)
        {
            return Conversation.DeleteConversation(iConversationId, iUserId);
        }

        #endregion

        #region yeshivot

        public List<Yeshivot> GetAllYeshivot()
        {
            return Yeshivot.GetAllYeshivot();
        }

        public int AddYeshiva(Yeshivot yeshiva)
        {
            return Yeshivot.AddYeshiva(yeshiva);
        }

        public bool EditYeshiva(Yeshivot yeshiva, int iYeshivaId)
        {
            return Yeshivot.EditYeshiva(yeshiva, iYeshivaId);
        }

        public Yeshivot getYeshivaById(int iYeshivaId)
        {
            return Yeshivot.getYeshivaById(iYeshivaId);
        }
        public bool DeleteYeshiva(int iYeshivaId, int iLastModifyUserId)
        {
            return Yeshivot.DeleteYeshiva(iYeshivaId, iLastModifyUserId);
        }

        public bool DeleteYeshivaOfStudent(int iPersonId, int iYeshivaId, int iUserId)
        {
            return Yeshivot.DeleteYeshivaOfStudent(iPersonId, iYeshivaId, iUserId);
        }


        public bool AddYeshivaToStudent(int iPersonId, int iYeshivaId, int iUserId)
        {
            return Yeshivot.AddYeshivaToStudent(iPersonId, iYeshivaId, iUserId);
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
        public int SetDocument(Document document, string nvBase64File, int iUserId)
        {
            return Document.SetDocument(document, nvBase64File, iUserId);
        }


        public List<Document> GetDocumentsByItemId(int iItemId)
        {
            return Document.GetDocumentsByItemId(iItemId);
        }


        public bool DeleteDocument(int iDocumentId, int iLastModifyUserId)
        {
            return Document.DeleteDocument(iDocumentId, iLastModifyUserId);
        }

        public List<Document> GetDocumentsOfTadmit()
        {
            return Document.GetDocumentsOfTadmit();
        }

        public List<Document> GetMoreDocumentsOfTadmit()
        {
            return Document.GetMoreDocumentsOfTadmit();
        }

        public bool changeTadmitStatus(int iDocumentId, int iUserId)
        {
            return Document.changeTadmitStatus(iDocumentId, iUserId);
        }
        public string GetBase64StringForDocument(string documentName)
        {
            return Document.GetBase64StringForDocument(documentName);
        }


        #endregion

        #region participant

        public List<Person> GetParticipantsList(int iEventId, int iUserId)
        {
            return Participant.GetParticipantsList(iEventId,iUserId);
        }

        public bool DeleteParticipant(int iEventId, int iPsersonId, int iUserId)
        {
            return Participant.DeleteParticipant(iEventId, iPsersonId, iUserId);
        }

        public List<Student> GetGraduatesList(int iUserId)
        {
            //throw new NotImplementedException();
            return Student.GetGraduatesList(iUserId);
        }
        public List<Person> GetPersonByUserId(int iUserId)
        {
            return Participant.GetPersonByUserId(iUserId);
        }

        public bool SetEventParticipant(bool isNew, int iStatusType, int iPersonId, int iEventId, int iUserId)
        {
            return Participant.SetEventParticipant(isNew, iStatusType, iPersonId, iEventId, iUserId);
        }

        public bool updateArriveStatus(Participant[] lstParticipant, int iUserId)
        {
            return Participant.updateArriveStatus(lstParticipant, iUserId);
        }
        //public bool SetEventParticipantList(Participant[] listParticipant, int iUserId)
        //{
        //    return Participant.SetEventParticipantList(listParticipant, iUserId);
        //}

        public bool SetEventParticipantList(Participant[] ParticipantList, int iUserId)
        {
            return Participant.SetEventParticipantList(ParticipantList, iUserId);
        }


        #endregion

        #region Fileshandler

        public string GeneratPdf(string headerHtml, string bodyHtml, string footerHtml)
        {
            return Fileshandler.GeneratPdf(headerHtml, bodyHtml, footerHtml);
        }
        public bool DeleteFile(string fileName, string folderPath = "")
        {
            return Fileshandler.DeleteFile(fileName, folderPath);
        }

        #endregion

        #region SendMessagesHandler

        public bool SendEmailOrFax(string from, string to, string subject, string body, List<Attachment> lAttach)
        {
            return SendMessagesHandler.SendEmailOrFax(from, to, subject, body, lAttach);
        }
        #endregion
        #region GlobalParameters

        public bool SaveGlobalParameters(List<TGlobalParameters> GlobalParameters)
        {
            return TGlobalParameters.SaveGlobalParameters(GlobalParameters);
        }

        public List<TGlobalParameters> GetGlobalParameters()
        {
            return TGlobalParameters.GetGlobalParameters();
        }


        public bool UpdGlobalParameters(List<TGlobalParameters> GlobalParameters)
        {
            return TGlobalParameters.UpdGlobalParameters(GlobalParameters);
        }
        public bool InsGlobalParameters(List<TGlobalParameters> GlobalParameters)
        {
            return TGlobalParameters.InsGlobalParameters(GlobalParameters);
        }



        #endregion



        #region presenceAvrech




        public List<PresenceAvrech> GetPresenceAvrechById(int iPersonId)
        {
            return PresenceAvrech.GetPresenceAvrechById(iPersonId);
        }

        public int SetPresence(PresenceAvrech presenceAvrech, int iUserId)
        {
            return PresenceAvrech.SetPresence(presenceAvrech, iUserId);
        }

        public bool DeletePresenceAvrech(int iPresenceAvrech, int iLastModifyUserId)
        {
            return PresenceAvrech.DeletePresenceAvrech(iPresenceAvrech, iLastModifyUserId);
        }





        #endregion

        public string PrintToPDF(string body, string title, string nvFilePath = null)
        {
            return TGlobalParameters.PrintToPDF(body, title, nvFilePath);
        }

     
    }

}