﻿using Service.Entities;
using Service.Utilities;
using System;
using System.Collections.Generic;
using System.Net.Mail;
using System.ServiceModel;
using System.ServiceModel.Web;
using Action = Service.Entities.Action;

namespace Service
{

    [ServiceContract]
    public interface IService
    {
        #region Person

        [OperationContract]
        [WebInvoke(
        Method = "POST",
        UriTemplate = "GetPersonLevel",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        string GetPersonLevel(int iPersonId);
        #endregion

        #region User

        [OperationContract]
        [WebInvoke(
        Method = "POST",
        UriTemplate = "GetUsers",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        List<User> GetUsers(int iPersonId);

        [OperationContract]
        [WebInvoke(
        Method = "POST",
        UriTemplate = "Login",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        User Login(string nvUserName, string nvPassword);


        [OperationContract]
        [WebInvoke(
        Method = "POST",
        UriTemplate = "GetUser",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        User GetUser(int iPersonId);

        [OperationContract]
        [WebInvoke(
        Method = "POST",
        UriTemplate = "SetUser",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        bool SetUser(User user, int iUserId);


        [OperationContract]
        [WebInvoke(
        Method = "POST",
        UriTemplate = "DeleteUser",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        bool DeleteUser(int iPersonId, int iUserId);

        #endregion


        #region Student

        [OperationContract]
        [WebInvoke(
        Method = "POST",
        UriTemplate = "GetBugrimList",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        List<Student> GetBugrimList(int iUserId);

        [OperationContract]
        [WebInvoke(
        Method = "POST",
        UriTemplate = "GetStudentList",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        List<Student> GetStudentList(int iUserId);

        [OperationContract]
        [WebInvoke(
        Method = "POST",
        UriTemplate = "GetStudentsByMonth",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        List<Student> GetStudentsByMonth(string month);


        [OperationContract]
        [WebInvoke(
        Method = "GET",
        UriTemplate = "GetStudentsAssociatedToAvrechim",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        Dictionary<int, int> GetStudentsAssociatedToAvrechim();


        [OperationContract]
        [WebInvoke(
        Method = "GET",
        UriTemplate = "GetStudentsAssociatedToAvrechimNames",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        Dictionary<int, string> GetStudentsAssociatedToAvrechimNames();

        [OperationContract]
        [WebInvoke(
        Method = "GET",
        UriTemplate = "GetCurrentYeshivaOfStudent",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        Dictionary<int, string> GetCurrentYeshivaOfStudent();

        [OperationContract]
        [WebInvoke(
        Method = "GET",
        UriTemplate = "GetCitiesOfYeshivotOfStudents",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        Dictionary<int, string> GetCitiesOfYeshivotOfStudents();

        [OperationContract]
        [WebInvoke(
        Method = "POST",
        UriTemplate = "GetStudentById",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        Student GetStudentById(int iStudentId);

        [OperationContract]
        [WebInvoke(
        Method = "POST",
        UriTemplate = "GetStudentsByAvrechId",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        List<Student> GetStudentsByAvrechId(int iAvrechId);

        [OperationContract]
        [WebInvoke(
        Method = "POST",
        UriTemplate = "AddStudentsToAvrech",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        bool AddStudentsToAvrech(List<T2Int> studentAndAvrechArr, int iUserId);

        [OperationContract]
        [WebInvoke(
        Method = "POST",
        UriTemplate = "AddStudent",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        bool AddStudent(Student student, int[] lstYeshivaId, string base64Image, int iUserId);


        [OperationContract]
        [WebInvoke(
        Method = "POST",
        UriTemplate = "UpdateStudent",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        bool UpdateStudent(Student student, int[] lstYeshivaId, string base64Image, int iUserId);



        [OperationContract]
        [WebInvoke(
        Method = "POST",
        UriTemplate = "UpdateStatusStudent",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        bool UpdateStatusStudent(int iPersonId, int iStatusType);

        [OperationContract]
        [WebInvoke(
        Method = "POST",
        UriTemplate = "UnionCards",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        bool UnionCards(Student student, int iStudent2);

        [OperationContract]
        [WebInvoke(
        Method = "POST",
        UriTemplate = "DeleteStudent",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        bool DeleteStudent(int iPersonId, int iUserId);

        [OperationContract]
        [WebInvoke(
        Method = "POST",
        UriTemplate = "GetYeshivotOfStudent",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        List<Yeshivot> GetYeshivotOfStudent(int iPersonId);


        #endregion Student


        #region Avrech

        [OperationContract]
        [WebInvoke(
        Method = "POST",
        UriTemplate = "GetAllAvrechim",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        List<Avrech> GetAllAvrechim(int? iPersonId);

        [OperationContract]
        [WebInvoke(
        Method = "POST",
        UriTemplate = "GetAvrechById",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        Avrech GetAvrechById(int? iPersonId);


        [OperationContract]
        [WebInvoke(
        Method = "POST",
        UriTemplate = "UpdateAvrech",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        bool UpdateAvrech(Avrech avrech, int iUserId);

        [OperationContract]
        [WebInvoke(
        Method = "POST",
        UriTemplate = "UpdateUserNameAndPassword",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        bool UpdateUserNameAndPassword(int iPersonId, string nvUserName, string nvPassword, int iUserId);



        [OperationContract]
        [WebInvoke(
        Method = "POST",
        UriTemplate = "GetAvrechStudents",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        List<Student> GetAvrechStudents(int iPersonId);





        [OperationContract]
        [WebInvoke(
        Method = "POST",
        UriTemplate = "DeleteAvrechStudent",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        bool DeleteAvrechStudent(int iAvrechId, int iStudentId);

        [OperationContract]
        [WebInvoke(
        Method = "POST",
        UriTemplate = "DeleteAvrech",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        bool DeleteAvrech(int iPersonId);


        [OperationContract]
        [WebInvoke(
        Method = "POST",
        UriTemplate = "GetAvrechByStudentId",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        List<Avrech> GetAvrechByStudentId(int iPersonId);

        [OperationContract]
        [WebInvoke(
        Method = "POST",
        UriTemplate = "GetAvrechIdByStudentId",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        int GetAvrechIdByStudentId(int iStudentId);

        [OperationContract]
        [WebInvoke(
       Method = "POST",
       UriTemplate = "MailToAvrechim",
       BodyStyle = WebMessageBodyStyle.WrappedRequest,
       ResponseFormat = WebMessageFormat.Json,
       RequestFormat = WebMessageFormat.Json)]
        bool MailToAvrechim(string[] mailList, string subject, string body);

        [OperationContract]
        [WebInvoke(
        Method = "POST",
        UriTemplate = "GetAllAvrechimByStudent",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        Avrech GetAllAvrechimByStudent(int iPersonId);

        //[OperationContract]
        //[WebInvoke(
        //Method = "POST",
        //UriTemplate = "AddAvrechToStudent",
        //BodyStyle = WebMessageBodyStyle.WrappedRequest,
        //ResponseFormat = WebMessageFormat.Json,
        //RequestFormat = WebMessageFormat.Json)]
        //bool AddAvrechToStudent(int studentId, int iAvrechId, int iUserId);
        #endregion


        #region events

        [OperationContract]
        [WebInvoke(
        Method = "POST",
        UriTemplate = "SetEvent",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        bool SetEvent(Event1 oEvent, int iUserId, List<TInt> to);

        [OperationContract]
        [WebInvoke(
        Method = "POST",
        UriTemplate = "GetEventsList",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        List<Event1> GetEventsList();

        [OperationContract]
        [WebInvoke(
        Method = "POST",
        UriTemplate = "GetEventsByStudent",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        List<Event1> GetEventsByStudent(int iPersonId);

        [OperationContract]
        [WebInvoke(
        Method = "POST",
        UriTemplate = "GetEvent",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        Event1 GetEvent(int? iEventId);

        [OperationContract]
        [WebInvoke(
     Method = "POST",
     UriTemplate = "DeleteEvent",
     BodyStyle = WebMessageBodyStyle.WrappedRequest,
     ResponseFormat = WebMessageFormat.Json,
     RequestFormat = WebMessageFormat.Json)]
        bool DeleteEvent(int iEventId, int iUserId);
        #endregion


        #region Meeting


        [OperationContract]
        [WebInvoke(
        Method = "POST",
        UriTemplate = "GetMeetingsByStudentId",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        List<Meeting> GetMeetingsByStudentId(int iPersonId);

        [OperationContract]
        [WebInvoke(
        Method = "POST",
        UriTemplate = "GetMeetingsByAvrechId",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        List<Meeting> GetMeetingsByAvrechId(int iAvrechId);

        [WebInvoke(
        Method = "POST",
        UriTemplate = "SetMeeting",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        int SetMeeting(Meeting meeting, int iUserId);

        [WebInvoke(
        Method = "POST",
        UriTemplate = "DeleteMeeting",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        bool DeleteMeeting(int iMeetingId, int iUserId);

        #endregion Meeting


        #region files


        [OperationContract]
        [WebInvoke(
        Method = "POST",
        UriTemplate = "SaveFileByBase64",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        string SaveFileByBase64(string base64File, string fileName);

        [OperationContract]
        [WebInvoke(
        Method = "POST",
        UriTemplate = "GeneratPdf",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        string GeneratPdf(string headerHtml, string bodyHtml, string footerHtml);

        [OperationContract]
        [WebInvoke(
Method = "POST",
UriTemplate = "DeleteFile",
BodyStyle = WebMessageBodyStyle.WrappedRequest,
ResponseFormat = WebMessageFormat.Json,
RequestFormat = WebMessageFormat.Json)]
        bool DeleteFile(string fileName, string folderPath = "");
        #endregion


        #region SysTableRow

        [OperationContract]
        [WebInvoke(
        Method = "POST",
        UriTemplate = "GetValues",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        List<SysTableRow> GetValues(int iSysTableId);


        [OperationContract]
        [WebInvoke(
        Method = "POST",
        UriTemplate = "UpdateValue",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        bool UpdateValue(SysTableRow sysTableRow, int iUserId);

        [OperationContract]
        [WebInvoke(
        Method = "POST",
        UriTemplate = "AddValue",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        bool AddValue(SysTableRow sysTableRow, int iUserId);
        #endregion


        #region SysTables

        [OperationContract]
        [WebInvoke(
        Method = "GET",
        UriTemplate = "GetAllNames",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        List<SysTables> GetAllNames();

        #endregion
        #region yeshivot
        [OperationContract]
        [WebInvoke(
        Method = "POST",
        UriTemplate = "AddYeshiva",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        int AddYeshiva(Yeshivot yeshiva);

        [OperationContract]
        [WebInvoke(
        Method = "POST",
        UriTemplate = "GetAllYeshivot",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        List<Yeshivot> GetAllYeshivot();

        [OperationContract]
        [WebInvoke(
        Method = "POST",
        UriTemplate = "EditYeshiva",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        bool EditYeshiva(Yeshivot yeshiva, int iYeshivaId);

        [OperationContract]
        [WebInvoke(
        Method = "POST",
        UriTemplate = "getYeshivaById",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        Yeshivot getYeshivaById(int iYeshivaId);

        [OperationContract]
        [WebInvoke(
        Method = "POST",
        UriTemplate = "DeleteYeshiva",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        bool DeleteYeshiva(int iYeshivaId, int iLastModifyUserId);

        [OperationContract]
        [WebInvoke(
       Method = "POST",
       UriTemplate = "DeleteYeshivaOfStudent",
       BodyStyle = WebMessageBodyStyle.WrappedRequest,
       ResponseFormat = WebMessageFormat.Json,
       RequestFormat = WebMessageFormat.Json)]
        bool DeleteYeshivaOfStudent(int iPersonId, int iYeshivaId, int iUserId);

        [OperationContract]
        [WebInvoke(
        Method = "POST",
        UriTemplate = "AddYeshivaToStudent",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        bool AddYeshivaToStudent(int iPersonId, int[] lstYeshivaId, int iUserId);





        #endregion


        #region Conversation


        [OperationContract]
        [WebInvoke(
        Method = "POST",
        UriTemplate = "GetConversations",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        List<Conversation> GetConversations(int? iPersonId);

        [OperationContract]
        [WebInvoke(
        Method = "POST",
        UriTemplate = "GetConversationsByAvrechId",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        List<Conversation> GetConversationsByAvrechId(int iAvrechId);

        [OperationContract]
        [WebInvoke(
        Method = "POST",
        UriTemplate = "SetConversations",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        int SetConversations(Conversation conversation, int iUserId);


        //[OperationContract]
        //[WebInvoke(
        //  Method = "POST",
        //  UriTemplate = "AddConversations",
        //  BodyStyle = WebMessageBodyStyle.WrappedRequest,
        //  ResponseFormat = WebMessageFormat.Json,
        //  RequestFormat = WebMessageFormat.Json)]
        //bool AddConversations(Conversation conversation, int iPersonId);

        //[OperationContract]
        //[WebInvoke(
        //  Method = "POST",
        //  UriTemplate = "UpdateConversations",
        //  BodyStyle = WebMessageBodyStyle.WrappedRequest,
        //  ResponseFormat = WebMessageFormat.Json,
        //  RequestFormat = WebMessageFormat.Json)]
        //bool UpdateConversations(Conversation conversation, int iPersonId);


        [OperationContract]
        [WebInvoke(
        Method = "POST",
        UriTemplate = "DeleteConversations",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        bool DeleteConversations(int iConversationId, int iUserId);


        #endregion Conversation

        #region participiant

        [OperationContract]
        [WebInvoke(
        Method = "POST",
        UriTemplate = "GetParticipantsList",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        List<Person> GetParticipantsList(int iEventId, int iUserId);

        [OperationContract]
        [WebInvoke(
        Method = "POST",
        UriTemplate = "DeleteParticipant",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        bool DeleteParticipant(int iEventId, int iPersonId, int iUserId);

        [OperationContract]
        [WebInvoke(
       Method = "POST",
       UriTemplate = "GetPersonByUserId",
       BodyStyle = WebMessageBodyStyle.WrappedRequest,
       ResponseFormat = WebMessageFormat.Json,
       RequestFormat = WebMessageFormat.Json)]
        List<Person> GetPersonByUserId(int iUserId);

        [OperationContract]
        [WebInvoke(
        Method = "POST",
        UriTemplate = "SetEventParticipant",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        bool SetEventParticipant(bool isNew, int iStatusType, int iPersonId, int iEventId, int iUserId);

        [OperationContract]
        [WebInvoke(
        Method = "POST",
        UriTemplate = "SetEventParticipantList",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        bool SetEventParticipantList(Participant[] listParticipant, int iUserId);

        [OperationContract]
        [WebInvoke(
        Method = "POST",
        UriTemplate = "updateArriveStatus",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        bool updateArriveStatus(Participant[] lstParticipant, int iUserId);
        #endregion

        #region Documents


        [OperationContract]
        [WebInvoke(
        Method = "GET",
        UriTemplate = "GetDocuments",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        List<Document> GetDocuments();



        //[OperationContract]	
        //[WebInvoke(	
        //Method = "POST",	
        //UriTemplate = "AddFile",	
        //BodyStyle = WebMessageBodyStyle.WrappedRequest,	
        //ResponseFormat = WebMessageFormat.Json,	
        //RequestFormat = WebMessageFormat.Json)]	
        //bool AddFile(int iItemId, int iBelongingType, int iCategoryType, string nvBase64File, string nvFileName, string nvComment);	


        [OperationContract]
        [WebInvoke(
        Method = "POST",
        UriTemplate = "SetDocument",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        int SetDocument(Document document, string nvBase64File, int iUserId);



        [OperationContract]
        [WebInvoke(
        Method = "POST",
        UriTemplate = "GetDocumentsByItemId",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        List<Document> GetDocumentsByItemId(int iItemId);


        [OperationContract]
        [WebInvoke(
        Method = "POST",
        UriTemplate = "DeleteDocument",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        bool DeleteDocument(int iDocumentId, int iLastModifyUserId);

        [OperationContract]
        [WebInvoke(
        Method = "POST",
        UriTemplate = "GetBase64StringForDocument",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        string GetBase64StringForDocument(string documentName);


        #endregion


        #region graduates

        [OperationContract]
        [WebInvoke(
        Method = "POST",
        UriTemplate = "GetGraduatesList",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        List<Student> GetGraduatesList(int iUserId);
        #endregion


        #region Task

        [WebInvoke(
        Method = "POST",
        UriTemplate = "SetTask",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        bool SetTask(Task task, int iUserId);


        [WebInvoke(
        Method = "POST",
        UriTemplate = "GetTasksByPersonId",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        List<Task> GetTasksByPersonId(int iPersonId);


        [WebInvoke(
        Method = "POST",
        UriTemplate = "GetActionsByPersonIdBetweenDates",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        List<Action> GetActionsByPersonIdBetweenDates(int iPersonId, DateTime fromDate, DateTime toDate);

        [WebInvoke(
         Method = "POST",
        UriTemplate = "DeleteTask",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        bool DeleteTask(int iTaskId, int iPersonId);
        #endregion




        #region SendMessagesHandler


        [OperationContract]
        [WebInvoke(
        Method = "POST",
        UriTemplate = "SendEmailOrFax",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        bool SendEmailOrFax(string from, string to, string subject, string body, List<Attachment> lAttach);

        #endregion

        #region GlobalParameters

        [OperationContract]
        [WebInvoke(
        Method = "POST",
        UriTemplate = "SaveGlobalParameters",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        bool SaveGlobalParameters(List<TGlobalParameters> GlobalParameters);
        [OperationContract]
        [WebInvoke(
      Method = "POST",
      UriTemplate = "UpdGlobalParameters",
      BodyStyle = WebMessageBodyStyle.WrappedRequest,
      ResponseFormat = WebMessageFormat.Json,
      RequestFormat = WebMessageFormat.Json)]
        bool UpdGlobalParameters(List<TGlobalParameters> GlobalParameters);
        [OperationContract]
        [WebInvoke(
        Method = "GET",
        UriTemplate = "GetGlobalParameters",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        List<TGlobalParameters> GetGlobalParameters();

        #endregion


        #region Documents



        //[OperationContract]
        //[WebInvoke(
        //Method = "POST",
        //UriTemplate = "AddFile",
        //BodyStyle = WebMessageBodyStyle.WrappedRequest,
        //ResponseFormat = WebMessageFormat.Json,
        //RequestFormat = WebMessageFormat.Json)]
        //bool AddFile(int iItemId, int iBelongingType, int iCategoryType, string nvBase64File, string nvFileName, string nvComment);




        [OperationContract]
        [WebInvoke(
        Method = "GET",
        UriTemplate = "GetDocumentsOfTadmit",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        List<Document> GetDocumentsOfTadmit();

        [OperationContract]
        [WebInvoke(
        Method = "GET",
        UriTemplate = "GetMoreDocumentsOfTadmit",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        List<Document> GetMoreDocumentsOfTadmit();

        [OperationContract]
        [WebInvoke(
        Method = "POST",
        UriTemplate = "changeTadmitStatus",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        bool changeTadmitStatus(int iDocumentId, int iUserId);


        #endregion


        #region PresenceAvrech


        [OperationContract]
        [WebInvoke(
        Method = "POST",
        UriTemplate = "GetPresenceAvrechById",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        List<PresenceAvrech> GetPresenceAvrechById(int iPersonId);

        [OperationContract]
        [WebInvoke(
        Method = "POST",
        UriTemplate = "DeletePresenceAvrech",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        bool DeletePresenceAvrech(int iPresenceAvrech, int iLastModifyUserId);


        [OperationContract]
        [WebInvoke(
        Method = "POST",
        UriTemplate = "SetPresence",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        int SetPresence(PresenceAvrech presenceAvrech, int iUserId);

        #endregion

        [OperationContract]
        [WebInvoke(
        Method = "POST",
        UriTemplate = "PrintToPDF",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        string PrintToPDF(string body, string title, string nvFilePath = null);

    }



}
























