using Service.Utilities;
using System;
using System.Collections.Generic;
using System.Data;
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
            #endregion
        }
    }
}