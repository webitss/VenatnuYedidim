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
            UriTemplate = "GetAllAvrechim",
            BodyStyle = WebMessageBodyStyle.WrappedRequest,
            ResponseFormat = WebMessageFormat.Json,
            RequestFormat = WebMessageFormat.Json)]
        List<Avrech> GetAllAvrechim(int iPersonId);

        #endregion
    }
}
