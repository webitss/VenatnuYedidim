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

<<<<<<< HEAD
        [OperationContract]
        [WebInvoke(
           Method = "POST",
           UriTemplate = "GetConversations",
           BodyStyle = WebMessageBodyStyle.WrappedRequest,
           ResponseFormat = WebMessageFormat.Json,
           RequestFormat = WebMessageFormat.Json)]
        List<Conversation> GetConversations(int iPersonId);
=======
        #endregion

        [OperationContract]
        [WebInvoke(
        Method = "POST",
        UriTemplate = "GetAvrechStudents",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        List<Student> GetAvrechStudents(int iPersonId);
>>>>>>> 41451d74e73ad3601800b86b7f547cfb53c20335

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
