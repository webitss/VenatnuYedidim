using Service.Entities;
<<<<<<< HEAD
using System.Collections.Generic;

=======
using Service.Utilities;
﻿using System.Collections.Generic;
>>>>>>> d8c9ac45a7e689cd834a17ba30d928886c858c15
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
<<<<<<< HEAD

        #endregion
      public List<Avrech> GetAllAvrechim(int iPersonId)
        {
            return Avrech.GetAllAvrechim(iPersonId);
        }

=======
        #endregion

        #region files

        public string SaveFileByBase64(string base64File, string fileName)
        {
            return Fileshandler.SaveFileByBase64(base64File,fileName);
        }

        #endregion
>>>>>>> d8c9ac45a7e689cd834a17ba30d928886c858c15
    }


}
