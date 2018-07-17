using Service.Entities;
using System.Collections.Generic;
using System.ServiceModel;
using System.ServiceModel.Web;

namespace Service
{
    [ServiceContract]
    public interface IService
    {
        #region User

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
            UriTemplate = "GetEventsList",
            BodyStyle = WebMessageBodyStyle.WrappedRequest,
            ResponseFormat = WebMessageFormat.Json,
            RequestFormat = WebMessageFormat.Json)]
        List<Event> GetEventsList(int iUserId);

        [OperationContract]

        [WebInvoke(
           Method = "POST",
           UriTemplate = "GetUsersByPermittion",
           BodyStyle = WebMessageBodyStyle.WrappedRequest,
           ResponseFormat = WebMessageFormat.Json,
           RequestFormat = WebMessageFormat.Json)]
        List<User> GetUsersByPermittion(int personId);

        [OperationContract]
        [WebInvoke(
          Method = "POST",
          UriTemplate = "SetUser",
          BodyStyle = WebMessageBodyStyle.WrappedRequest,
          ResponseFormat = WebMessageFormat.Json,
          RequestFormat = WebMessageFormat.Json)]
        void SetUser(int iPersonId, int iUserId, string nvLastName, string nvFirstName, string nvPhone, string nvEmail, string nvUserName, string nvPassword, int iPermissionType);

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
        bool UpdateAvrech(Avrech avrech);


        //[OperationContract]
        //[WebInvoke(
        //   Method = "POST",
        //   UriTemplate = "GetConversations",
        //   BodyStyle = WebMessageBodyStyle.WrappedRequest,
        //   ResponseFormat = WebMessageFormat.Json,
        //   RequestFormat = WebMessageFormat.Json)]
        //List<Conversation> GetConversations(int iPersonId);


        #endregion

        [OperationContract]
        [WebInvoke(
        Method = "POST",
        UriTemplate = "GetAvrechStudents",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        List<Student> GetAvrechStudents(int iPersonId);


        //[WebInvoke(
        //   Method = "POST",
        //   UriTemplate = "GetConversations",
        //   BodyStyle = WebMessageBodyStyle.WrappedRequest,
        //   ResponseFormat = WebMessageFormat.Json,
        //   RequestFormat = WebMessageFormat.Json)]
        //List<Conversation> GetConversations(int iPersonId);


        

        [OperationContract]
        [WebInvoke(
        Method = "POST",
        UriTemplate = "AddEvent",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        bool AddEvent(Event oEvent);

        #region Conversation

        [OperationContract]
        [WebInvoke(
          Method = "POST",
          UriTemplate = "GetConversations",
          BodyStyle = WebMessageBodyStyle.WrappedRequest,
          ResponseFormat = WebMessageFormat.Json,
          RequestFormat = WebMessageFormat.Json)]
        List<Conversation> GetConversations(int iPersonId);
        #endregion Conversation

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
        //[OperationContract]
        //[WebInvoke(
        //Method = "GET",
        //UriTemplate = "GetAllNames",
        //BodyStyle = WebMessageBodyStyle.WrappedRequest,
        //ResponseFormat = WebMessageFormat.Json,
        //RequestFormat = WebMessageFormat.Json)]
        //List<SysTableRow> GetAllNames();

        #endregion

        //[OperationContract]
        //[WebInvoke(
        //Method = "POST",
        //UriTemplate = "AddYeshiva",
        //BodyStyle = WebMessageBodyStyle.WrappedRequest,
        //ResponseFormat = WebMessageFormat.Json,
        //RequestFormat = WebMessageFormat.Json)]
        //bool AddYeshiva(Yeshivot yeshiva);
    }

}
