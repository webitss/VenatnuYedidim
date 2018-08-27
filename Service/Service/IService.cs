using Service.Entities;
using Service.Utilities;
using System;
using System.Collections.Generic;
using System.Net.Mail;
using System.ServiceModel;
using System.ServiceModel.Web;

namespace Service
{
    [ServiceContract]
    public interface IService
    {
        #region Person

        //[OperationContract]
        //[WebInvoke(
        //   Method = "POST",
        //   UriTemplate = "GetPerson",
        //   BodyStyle = WebMessageBodyStyle.WrappedRequest,
        //   ResponseFormat = WebMessageFormat.Json,
        //   RequestFormat = WebMessageFormat.Json)]
        //Person GetPerson(int iPersonId);

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

        #endregion

        #region Student
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
         UriTemplate = "GetStudentById",
         BodyStyle = WebMessageBodyStyle.WrappedRequest,
         ResponseFormat = WebMessageFormat.Json,
         RequestFormat = WebMessageFormat.Json)]
        Student GetStudentById(int iPersonId);

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
        bool AddStudent(Student student, int iUserId);


        [OperationContract]
        [WebInvoke(
        Method = "POST",
        UriTemplate = "UpdateStudent",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        bool UpdateStudent(Student student, int iUserId);



        [OperationContract]
        [WebInvoke(
        Method = "POST",
        UriTemplate = "UpdateStatusStudent",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        bool UpdateStatusStudent(int iPersonId, int iStatusType);

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
        UriTemplate = "DeleteAvrechStudent",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        bool DeleteAvrechStudent(int iAvrechId, int iStudentId);
        #endregion



        [OperationContract]
        [WebInvoke(
        Method = "POST",
        UriTemplate = "GetAvrechStudents",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        List<Student> GetAvrechStudents(int iPersonId);



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
        List<Event1> GetEventsList(int iUserId);


        [OperationContract]
        [WebInvoke(
Method = "POST",
UriTemplate = "GetEvent",
BodyStyle = WebMessageBodyStyle.WrappedRequest,
ResponseFormat = WebMessageFormat.Json,
RequestFormat = WebMessageFormat.Json)]
        Event1 GetEvent(int? iEventId);
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

        //[WebInvoke(
        //  Method = "POST",
        //  UriTemplate = "AddMeeting",
        //  BodyStyle = WebMessageBodyStyle.WrappedRequest,
        //  ResponseFormat = WebMessageFormat.Json,
        //  RequestFormat = WebMessageFormat.Json)]
        //bool AddMeeting(Meeting meeting, int iUserId);



        [WebInvoke(
       Method = "POST",
       UriTemplate = "SetTask",
       BodyStyle = WebMessageBodyStyle.WrappedRequest,
       ResponseFormat = WebMessageFormat.Json,
       RequestFormat = WebMessageFormat.Json)]
        bool SetTask(Task task, int iUserId);

        //[WebInvoke(
        //  Method = "POST",
        //  UriTemplate = "UpdateMeeting",
        //  BodyStyle = WebMessageBodyStyle.WrappedRequest,
        //  ResponseFormat = WebMessageFormat.Json,
        //  RequestFormat = WebMessageFormat.Json)]
        //bool UpdateMeeting(Meeting meeting, int iUserId);

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
        bool UpdateValue(SysTableRow sysTableRow);

        [OperationContract]
        [WebInvoke(
       Method = "POST",
       UriTemplate = "AddValue",
       BodyStyle = WebMessageBodyStyle.WrappedRequest,
       ResponseFormat = WebMessageFormat.Json,
       RequestFormat = WebMessageFormat.Json)]
        bool AddValue(SysTableRow sysTableRow);
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
        bool AddYeshiva(Yeshivot yeshiva);

        [OperationContract]
        [WebInvoke(
        Method = "POST",
        UriTemplate = "GetAllYeshivot",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        List<Yeshivot> GetAllYeshivot(int iYeshivaId);

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
        UriTemplate = "SetConversations",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        bool SetConversations(Conversation conversation, int iPersonId);

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
        bool DeleteConversations(int iConversationId, int iPersonId);

        #endregion Conversation

        #region participiant

        [OperationContract]
        [WebInvoke(
          Method = "POST",
          UriTemplate = "GetParticipantsList",
          BodyStyle = WebMessageBodyStyle.WrappedRequest,
          ResponseFormat = WebMessageFormat.Json,
          RequestFormat = WebMessageFormat.Json)]
        List<Person> GetParticipantsList(int iEventId);

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
        bool SetDocument(Document document, string nvBase64File);



        [OperationContract]
        [WebInvoke(
        Method = "POST",
        UriTemplate = "GetDocumentsByItemId",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        List<Document> GetDocumentsByItemId(int iItemId);
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
            UriTemplate = "SetMeeting",
            BodyStyle = WebMessageBodyStyle.WrappedRequest,
            ResponseFormat = WebMessageFormat.Json,
            RequestFormat = WebMessageFormat.Json)]
        bool SetMeeting(Meeting meeting, int iUserId);

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
    }

}