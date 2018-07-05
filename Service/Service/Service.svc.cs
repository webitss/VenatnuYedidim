using System.Collections.Generic;
using Service.Entities;

namespace Service
{
    public class Service : IService
    {
        public List<User> GetUsersByPermittion(int personId)
        {
            throw new System.NotImplementedException();
        }
        #region User

        public User Login(string nvUserName, string nvPassword)
        {
            return User.Login(nvUserName, nvPassword);
        }
     
        #endregion       
    }
}
