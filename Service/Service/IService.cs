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
<<<<<<< HEAD
        [WebInvoke(
            Method = "GET",
            UriTemplate = "GetEventsList",
            BodyStyle = WebMessageBodyStyle.WrappedRequest,
            ResponseFormat = WebMessageFormat.Json,
            RequestFormat = WebMessageFormat.Json)]
        List<Event> GetEventsList(int iUserId);

        [OperationContract]
=======
>>>>>>> 41451d74e73ad3601800b86b7f547cfb53c20335
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

        #endregion

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
        UriTemplate = "AddEvent",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        bool AddEvent(Event oEvent);

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
    }
}
