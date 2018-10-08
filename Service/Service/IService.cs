
using Service.Entities;
using Service.Utilities;
using System;
using System.Collections.Generic;
using System.Net.Mail;
using System.ServiceModel;
using System.ServiceModel.Web;

namespace Service
{


<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 28bf174dbb98d5b3316e3cb400a437065da32af5
    [ServiceContract]
    public interface IService
    {

<<<<<<< HEAD
        #region User	
=======
        #region User
>>>>>>> 28bf174dbb98d5b3316e3cb400a437065da32af5

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
        bool DeleteUser(int iPersonId);

        #endregion

<<<<<<< HEAD
        #region Student	
=======
        #region Student
>>>>>>> 28bf174dbb98d5b3316e3cb400a437065da32af5
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
        bool AddStudent(Student student, string base64Image, int iUserId);


        [OperationContract]
        [WebInvoke(
        Method = "POST",
        UriTemplate = "UpdateStudent",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        bool UpdateStudent(Student student, string base64Image, int iUserId);



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
        UriTemplate = "GetYeshivotOfStudent",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        List<Yeshivot> GetYeshivotOfStudent(int iPersonId);


<<<<<<< HEAD
        #endregion Student	

        #region Avrech	
=======
        #endregion Student

        #region Avrech
>>>>>>> 28bf174dbb98d5b3316e3cb400a437065da32af5

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
        UriTemplate = "GetAvrechimByStudentId",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        List<Avrech> GetAvrechimByStudentId(int iPersonId);

        #endregion


<<<<<<< HEAD
        #region events	
=======
        #region events
>>>>>>> 28bf174dbb98d5b3316e3cb400a437065da32af5
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

<<<<<<< HEAD
        #region Meeting	
=======
        #region Meeting
>>>>>>> 28bf174dbb98d5b3316e3cb400a437065da32af5

        [OperationContract]
        [WebInvoke(
        Method = "POST",
        UriTemplate = "GetMeetingsByStudentId",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        List<Meeting> GetMeetingsByStudentId(int iPersonId);

<<<<<<< HEAD
        //[WebInvoke(	
        //  Method = "POST",	
        //  UriTemplate = "AddMeeting",	
        //  BodyStyle = WebMessageBodyStyle.WrappedRequest,	
        //  ResponseFormat = WebMessageFormat.Json,	
        //  RequestFormat = WebMessageFormat.Json)]	
        //bool AddMeeting(Meeting meeting, int iUserId);	
=======
        //[WebInvoke(
        //  Method = "POST",
        //  UriTemplate = "AddMeeting",
        //  BodyStyle = WebMessageBodyStyle.WrappedRequest,
        //  ResponseFormat = WebMessageFormat.Json,
        //  RequestFormat = WebMessageFormat.Json)]
        //bool AddMeeting(Meeting meeting, int iUserId);
>>>>>>> 28bf174dbb98d5b3316e3cb400a437065da32af5



        [WebInvoke(
        Method = "POST",
        UriTemplate = "SetMeeting",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        int SetMeeting(Meeting meeting, int iUserId);

<<<<<<< HEAD
        //[WebInvoke(	
        //  Method = "POST",	
        //  UriTemplate = "UpdateMeeting",	
        //  BodyStyle = WebMessageBodyStyle.WrappedRequest,	
        //  ResponseFormat = WebMessageFormat.Json,	
        //  RequestFormat = WebMessageFormat.Json)]	
        //bool UpdateMeeting(Meeting meeting, int iUserId);	
=======
        //[WebInvoke(
        //  Method = "POST",
        //  UriTemplate = "UpdateMeeting",
        //  BodyStyle = WebMessageBodyStyle.WrappedRequest,
        //  ResponseFormat = WebMessageFormat.Json,
        //  RequestFormat = WebMessageFormat.Json)]
        //bool UpdateMeeting(Meeting meeting, int iUserId);
>>>>>>> 28bf174dbb98d5b3316e3cb400a437065da32af5

        [WebInvoke(
        Method = "POST",
        UriTemplate = "DeleteMeeting",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        bool DeleteMeeting(int iMeetingId, int iUserId);

<<<<<<< HEAD
        #endregion Meeting	


        #region files	
=======
        #endregion Meeting


        #region files
>>>>>>> 28bf174dbb98d5b3316e3cb400a437065da32af5

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

<<<<<<< HEAD
        #region SysTableRow	
=======
        #region SysTableRow
>>>>>>> 28bf174dbb98d5b3316e3cb400a437065da32af5
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

<<<<<<< HEAD
        #region SysTables	
=======
        #region SysTables
>>>>>>> 28bf174dbb98d5b3316e3cb400a437065da32af5
        [OperationContract]
        [WebInvoke(
        Method = "GET",
        UriTemplate = "GetAllNames",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        List<SysTables> GetAllNames();

        #endregion

<<<<<<< HEAD
        #region yeshivot	
=======
        #region yeshivot
>>>>>>> 28bf174dbb98d5b3316e3cb400a437065da32af5

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

        #endregion

<<<<<<< HEAD
        #region Conversation	
=======
        #region Conversation
>>>>>>> 28bf174dbb98d5b3316e3cb400a437065da32af5

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
        int SetConversations(Conversation conversation, int iUserId);


<<<<<<< HEAD
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
=======
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
>>>>>>> 28bf174dbb98d5b3316e3cb400a437065da32af5

        [OperationContract]
        [WebInvoke(
        Method = "POST",
        UriTemplate = "DeleteConversations",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        bool DeleteConversations(int iConversationId, int iPersonId);

<<<<<<< HEAD
        #endregion Conversation	

        #region participiant	
=======
        #endregion Conversation

        #region participiant
>>>>>>> 28bf174dbb98d5b3316e3cb400a437065da32af5

        [OperationContract]
        [WebInvoke(
        Method = "POST",
        UriTemplate = "GetParticipantsList",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        List<Person> GetParticipantsList(int iEventId);

        #endregion

<<<<<<< HEAD
        #region Documents	
=======
        #region Documents
>>>>>>> 28bf174dbb98d5b3316e3cb400a437065da32af5

        [OperationContract]
        [WebInvoke(
        Method = "GET",
        UriTemplate = "GetDocuments",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        List<Document> GetDocuments();


<<<<<<< HEAD
        //[OperationContract]	
        //[WebInvoke(	
        //Method = "POST",	
        //UriTemplate = "AddFile",	
        //BodyStyle = WebMessageBodyStyle.WrappedRequest,	
        //ResponseFormat = WebMessageFormat.Json,	
        //RequestFormat = WebMessageFormat.Json)]	
        //bool AddFile(int iItemId, int iBelongingType, int iCategoryType, string nvBase64File, string nvFileName, string nvComment);	
=======
        //[OperationContract]
        //[WebInvoke(
        //Method = "POST",
        //UriTemplate = "AddFile",
        //BodyStyle = WebMessageBodyStyle.WrappedRequest,
        //ResponseFormat = WebMessageFormat.Json,
        //RequestFormat = WebMessageFormat.Json)]
        //bool AddFile(int iItemId, int iBelongingType, int iCategoryType, string nvBase64File, string nvFileName, string nvComment);
>>>>>>> 28bf174dbb98d5b3316e3cb400a437065da32af5

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


        #endregion

<<<<<<< HEAD
        #region graduates	
=======
        #region graduates
>>>>>>> 28bf174dbb98d5b3316e3cb400a437065da32af5
        [OperationContract]
        [WebInvoke(
        Method = "POST",
        UriTemplate = "GetGraduatesList",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        List<Student> GetGraduatesList(int iUserId);
        #endregion

<<<<<<< HEAD
        #region Task	
=======
        #region Task
>>>>>>> 28bf174dbb98d5b3316e3cb400a437065da32af5
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


        #endregion

<<<<<<< HEAD
        #region SendMessagesHandler	
=======
        #region SendMessagesHandler
>>>>>>> 28bf174dbb98d5b3316e3cb400a437065da32af5

        [OperationContract]
        [WebInvoke(
        Method = "POST",
        UriTemplate = "SendEmailOrFax",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        bool SendEmailOrFax(string from, string to, string subject, string body, List<Attachment> lAttach);

        #endregion
<<<<<<< HEAD
        #region GlobalParameters	
=======
        #region GlobalParameters
>>>>>>> 28bf174dbb98d5b3316e3cb400a437065da32af5

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
        Method = "GET",
        UriTemplate = "GetGlobalParameters",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        List<TGlobalParameters> GetGlobalParameters();

        #endregion

<<<<<<< HEAD
        #region Documents	



        //[OperationContract]	
        //[WebInvoke(	
        //Method = "POST",	
        //UriTemplate = "AddFile",	
        //BodyStyle = WebMessageBodyStyle.WrappedRequest,	
        //ResponseFormat = WebMessageFormat.Json,	
        //RequestFormat = WebMessageFormat.Json)]	
        //bool AddFile(int iItemId, int iBelongingType, int iCategoryType, string nvBase64File, string nvFileName, string nvComment);	
=======
        #region Documents



        //[OperationContract]
        //[WebInvoke(
        //Method = "POST",
        //UriTemplate = "AddFile",
        //BodyStyle = WebMessageBodyStyle.WrappedRequest,
        //ResponseFormat = WebMessageFormat.Json,
        //RequestFormat = WebMessageFormat.Json)]
        //bool AddFile(int iItemId, int iBelongingType, int iCategoryType, string nvBase64File, string nvFileName, string nvComment);
>>>>>>> 28bf174dbb98d5b3316e3cb400a437065da32af5



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

<<<<<<< HEAD
        #region PresenceAvrech	
=======
        #region PresenceAvrech
>>>>>>> 28bf174dbb98d5b3316e3cb400a437065da32af5

        [OperationContract]
        [WebInvoke(
        Method = "POST",
        UriTemplate = "GetPresenceAvrechById",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        List<PresenceAvrech> GetPresenceAvrechById(int iPresenceAvrech);

        [OperationContract]
        [WebInvoke(
        Method = "POST",
        UriTemplate = "DeletePresenceAvrech",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        bool DeletePresenceAvrech(int ipresenceAvrech, int iLastModifyUserId);


        [OperationContract]
        [WebInvoke(
        Method = "POST",
        UriTemplate = "SetPresence",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        bool SetPresence(PresenceAvrech presenceAvrech);

        #endregion


    }



}
<<<<<<< HEAD






































=======
=======
	[ServiceContract]
	public interface IService
	{

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
		bool DeleteUser(int iPersonId);

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
		bool AddStudent(Student student, string base64Image, int iUserId);


		[OperationContract]
		[WebInvoke(
		Method = "POST",
		UriTemplate = "UpdateStudent",
		BodyStyle = WebMessageBodyStyle.WrappedRequest,
		ResponseFormat = WebMessageFormat.Json,
		RequestFormat = WebMessageFormat.Json)]
		bool UpdateStudent(Student student, string base64Image, int iUserId);



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
		UriTemplate = "GetAvrechimByStudentId",
		BodyStyle = WebMessageBodyStyle.WrappedRequest,
		ResponseFormat = WebMessageFormat.Json,
		RequestFormat = WebMessageFormat.Json)]
		List<Avrech> GetAvrechimByStudentId(int iPersonId);

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
		UriTemplate = "SetMeeting",
		BodyStyle = WebMessageBodyStyle.WrappedRequest,
		ResponseFormat = WebMessageFormat.Json,
		RequestFormat = WebMessageFormat.Json)]
		int SetMeeting(Meeting meeting, int iUserId);

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
		List<PresenceAvrech> GetPresenceAvrechById(int iPresenceAvrech);

		[OperationContract]
		[WebInvoke(
		Method = "POST",
		UriTemplate = "DeletePresenceAvrech",
		BodyStyle = WebMessageBodyStyle.WrappedRequest,
		ResponseFormat = WebMessageFormat.Json,
		RequestFormat = WebMessageFormat.Json)]
		bool DeletePresenceAvrech(int ipresenceAvrech, int iLastModifyUserId);


		[OperationContract]
		[WebInvoke(
		Method = "POST",
		UriTemplate = "SetPresence",
		BodyStyle = WebMessageBodyStyle.WrappedRequest,
		ResponseFormat = WebMessageFormat.Json,
		RequestFormat = WebMessageFormat.Json)]
		bool SetPresence(PresenceAvrech presenceAvrech);

		#endregion


	}



}
>>>>>>> dcfa098d9ddf433962220def1d718b17bdc929f4
>>>>>>> 28bf174dbb98d5b3316e3cb400a437065da32af5
