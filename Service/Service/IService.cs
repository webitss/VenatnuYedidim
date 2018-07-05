using Service.Entities;
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

        #endregion

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