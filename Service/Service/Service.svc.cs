using Service.Entities;
using System.Collections.Generic;

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
      public List<Avrech> GetAllAvrechim(int iPersonId)
        {
            return Avrech.GetAllAvrechim(iPersonId);
        }

    }


}
