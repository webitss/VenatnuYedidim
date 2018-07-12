using Service.Entities;
using Service.Utilities;
using System.Collections.Generic;

namespace Service
{
    public class Service : IService
    {
        #region User
        public List<User> GetUsersByPermittion(int personId)
        {
            throw new System.NotImplementedException();
        }


        public User Login(string nvUserName, string nvPassword)
        {
            return User.Login(nvUserName, nvPassword);
        }


        #endregion

        public List<Avrech> GetAllAvrechim(int iPersonId)
        {
            return Avrech.GetAllAvrechim(iPersonId);
        }

        #region files

        public string SaveFileByBase64(string base64File, string fileName)
        {
            return Fileshandler.SaveFileByBase64(base64File, fileName);
        }

        #endregion
        #region SysTableRow
        public List<SysTableRow> GetValues(int iSysTableId)
        {
            return SysTableRow.GetValues(iSysTableId);
        }
        #endregion
        #region SysTables
        public List<SysTables> GetAllNames(int iSysTableId)
        {
            return SysTables.GetAllNames();
        }
        #endregion

    }


}
