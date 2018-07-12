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
            return User.GetUsers(personId);
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

        public List<Student> GetAvrechStudents(int iPersonId)
        {
            return Avrech.GetAvrechStudents(iPersonId);
        }

        #region files

        public string SaveFileByBase64(string base64File, string fileName)
        {
            return Fileshandler.SaveFileByBase64(base64File, fileName);
        }

        #endregion
    }


}
