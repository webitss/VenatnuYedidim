using Service.Entities;
using System.Collections.Generic;
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
        void SetUser(User user, int iUserId);

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
        UriTemplate = "AddEvent",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        bool AddEvent(Event1 addEvent, int iUserId);

        [WebInvoke(
Method = "POST",
UriTemplate = "GetEventsList",
BodyStyle = WebMessageBodyStyle.WrappedRequest,
ResponseFormat = WebMessageFormat.Json,
RequestFormat = WebMessageFormat.Json)]
        List<Event1> GetEventsList(int iUserId);
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

        [WebInvoke(
          Method = "POST",
          UriTemplate = "AddMeeting",
          BodyStyle = WebMessageBodyStyle.WrappedRequest,
          ResponseFormat = WebMessageFormat.Json,
          RequestFormat = WebMessageFormat.Json)]
        bool AddMeeting(Meeting meeting, int iUserId);

        [WebInvoke(
          Method = "POST",
          UriTemplate = "UpdateMeeting",
          BodyStyle = WebMessageBodyStyle.WrappedRequest,
          ResponseFormat = WebMessageFormat.Json,
          RequestFormat = WebMessageFormat.Json)]
        bool UpdateMeeting(Meeting meeting, int iUserId);

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
          UriTemplate = "AddConversations",
          BodyStyle = WebMessageBodyStyle.WrappedRequest,
          ResponseFormat = WebMessageFormat.Json,
          RequestFormat = WebMessageFormat.Json)]
        bool AddConversations(Conversation conversation, int iUserId);

        [OperationContract]
        [WebInvoke(
          Method = "POST",
          UriTemplate = "UpdateConversations",
          BodyStyle = WebMessageBodyStyle.WrappedRequest,
          ResponseFormat = WebMessageFormat.Json,
          RequestFormat = WebMessageFormat.Json)]
        bool UpdateConversations(Conversation conversation, int iUserId);

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
       List<Person> GetParticipantsList(int iEventId);

        #endregion

        #region Documents

        [OperationContract]
        [WebInvoke(
         Method = "POST",
         UriTemplate = "GetDocuments",
         BodyStyle = WebMessageBodyStyle.WrappedRequest,
         ResponseFormat = WebMessageFormat.Json,
         RequestFormat = WebMessageFormat.Json)]
        List<Document> GetDocuments();

        #endregion
    }

}