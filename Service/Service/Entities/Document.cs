using Service.Utilities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Service.Entities
{
    [DataContract]
    public class Document
    {
        #region Data Members
        [DataMember]
        public int iDocumentId { get; set; }
        [DataMember]
        public int iItemId { get; set; }
        [DataMember]
        public int iBelongingType { get; set; }
        [DataMember]
        public string nvDocumentName { get; set; }
        [DataMember]
        public string nvDocumentType { get; set; }
        [DataMember]
        public int iCategoryType { get; set; }
        [DataMember]
        public string nvComment { get; set; }
        [DataMember]
        public DateTime? dtCreatedate { get; set; }


        [NoSQL]
        [DataMember]
        public Dictionary<string, string> lstObject { get; set; }

        #endregion

        #region Methods
        public static List<Document> GetDocuments()
        {
            {
                try
                {
                    List<Document> documents = new List<Document>();
                    DataRowCollection drc = SqlDataAccess.ExecuteDatasetSP("TDocuments_OfStudents_SLCT").Tables[0].Rows;
                    foreach (DataRow dr in drc)
                    {
                        documents.Add(ObjectGenerator<Document>.GeneratFromDataRow(dr));
                        documents.Last().lstObject = new Dictionary<string, string>();
                        documents.Last().lstObject.Add("nvName", dr["nvName"].ToString());
                        documents.Last().lstObject.Add("nvIdentityCard", dr["nvIdentityCard"].ToString());
                        documents.Last().lstObject.Add("nvCategory", dr["nvCategory"].ToString());
                    }
                    return documents;
                }
                catch (Exception ex)
                {
                    Log.LogError("GetDocuments / TDocuments_OfStudents_SLCT", ", ex " + ex);
                    return null;
                }

            }

        }
        //public static List<Document> GetImage()
        //{
        //    {
        //        try
        //        {
        //            List<Document> documents = new List<Document>();
        //            DataRowCollection drc = SqlDataAccess.ExecuteDatasetSP("TDocuments_OfIMAGE_SLCT").Tables[0].Rows;
        //            foreach (DataRow dr in drc)
        //            {
        //                documents.Add(ObjectGenerator<Document>.GeneratFromDataRow(dr));
                       
        //            }
        //            return documents;
        //        }
        //        catch (Exception ex)
        //        {
        //            Log.LogError("GetDocuments / TDocuments_OfStudents_SLCT", ", ex " + ex);
        //            return null;
        //        }



        public static int SetDocument(Document document, string nvBase64File,int iUserId)
        {
            try
            {
                if (nvBase64File != "")
                {
                    document.nvDocumentName= Fileshandler.SaveFileByBase64(nvBase64File, document.nvDocumentName);
                    if (document.iDocumentId != 0)
                    {
                        DataRow dr = SqlDataAccess.ExecuteDatasetSP("TDocuments_ByDocumentId_SLCT", new SqlParameter("iDocumentId", document.iDocumentId)).Tables[0].Rows[0];
                        string prevName= ObjectGenerator<Document>.GeneratFromDataRow(dr).nvDocumentName;
                        Fileshandler.DeleteFile(prevName);
                    }


                }
                List<SqlParameter> sqlParameters = ObjectGenerator<Document>.GetSqlParametersFromObject(document);
                sqlParameters.Add(new SqlParameter("iUserId", iUserId));

                var dtCreatedate = sqlParameters.Where(s => s.ParameterName.Equals("dtCreatedate")).FirstOrDefault();
                sqlParameters.Remove(dtCreatedate);
                //SqlDataAccess.ExecuteDatasetSP("TDocuments_INS/UPD", sqlParameters);

                //return true;

                int id = int.Parse(SqlDataAccess.ExecuteDatasetSP("TDocuments_INS/UPD", sqlParameters).Tables[0].Rows[0][0].ToString());
                return id;
            }
            catch (Exception ex)
            {
                Log.LogError("SetDocument /TDocuments_INS/upd", "ex: " + ex);
                return 0;
            }
        }

        public static List<Document> GetDocumentsByItemId(int iItemId)
        {
            try
            {
                List<Document> documents = new List<Document>();
                DataRowCollection drc = SqlDataAccess.ExecuteDatasetSP("TDocuments_ByItemId_SLCT", new SqlParameter("iItemId", iItemId)).Tables[0].Rows;
                foreach (DataRow dr in drc)
                {
                    documents.Add(ObjectGenerator<Document>.GeneratFromDataRow(dr));
                    documents.Last().lstObject = new Dictionary<string, string>();
                    documents.Last().lstObject.Add("nvCategory", dr["nvCategory"].ToString());
                }
                return documents;
            }
            catch (Exception ex)
            {
                Log.LogError("GetDocumentsByItemId / TDocuments_ByItemId_SLCT", ", ex " + ex);
                return null;
            }

        }

        public static bool DeleteDocument(int iDocumentId, int iUserId)
        {
            try
            {
                List<SqlParameter> parameters = new List<SqlParameter>();
                parameters.Add(new SqlParameter("iDocumentId", iDocumentId));
                parameters.Add(new SqlParameter("iLastModifyUserId", iUserId));
                SqlDataAccess.ExecuteDatasetSP("TDocuments_DEL", parameters);

                return true;
            }
            catch (Exception ex)
            {
                Log.LogError("DeleteDocument / TDocuments_DEL", "ex" + ex);
                return false;
            }
        }
        
        #endregion
    }
}