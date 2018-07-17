﻿using Service.Entities;
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
           UriTemplate = "GetUsersByPermittion",
           BodyStyle = WebMessageBodyStyle.WrappedRequest,
           ResponseFormat = WebMessageFormat.Json,
           RequestFormat = WebMessageFormat.Json)]
        List<User> GetUsersByPermittion(int personId);

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
          UriTemplate = "SetUser",
          BodyStyle = WebMessageBodyStyle.WrappedRequest,
          ResponseFormat = WebMessageFormat.Json,
          RequestFormat = WebMessageFormat.Json)]
        void SetUser(User user);

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
        bool UpdateAvrech(Avrech avrech);

        #endregion

        #region student

        [OperationContract]
        [WebInvoke(
        Method = "POST",
        UriTemplate = "GetAvrechStudents",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        List<Student> GetAvrechStudents(int iPersonId);

        #endregion

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
        List<Conversation> GetConversations(int? iPersonId);

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

        #region yeshivot

        //[OperationContract]
        //[WebInvoke(
        //Method = "POST",
        //UriTemplate = "AddYeshiva",
        //BodyStyle = WebMessageBodyStyle.WrappedRequest,
        //ResponseFormat = WebMessageFormat.Json,
        //RequestFormat = WebMessageFormat.Json)]
        //bool AddYeshiva(Yeshivot yeshiva);

        //[OperationContract]
        //[WebInvoke(
        //Method = "POST",
        //UriTemplate = "GetAllYeshivot",
        //BodyStyle = WebMessageBodyStyle.WrappedRequest,
        //ResponseFormat = WebMessageFormat.Json,
        //RequestFormat = WebMessageFormat.Json)]
        //List<Yeshivot> GetAllYeshivot(int iYeshivaId);

        #endregion
    }

}
