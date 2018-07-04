using Service.Entities;

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
    }
}
