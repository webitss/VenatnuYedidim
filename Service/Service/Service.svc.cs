using Service.Entities;
using Service.Utilities;

namespace Service
{
    public class Service : IService
    {
        #region User

        public User Login(string nvUserName, string nvPassword)
        {
            return User.Login(nvUserName, nvPassword);
        }
        #endregion

        #region files

        public string SaveFileByBase64(string base64File, string fileName)
        {
            return Fileshandler.SaveFileByBase64(base64File,fileName);
        }

        #endregion
    }
}
