﻿using Service.Entities;
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

       public void SetUser(int iPersonId, int iUserId, string nvLastName, string nvFirstName, string nvPhone, string nvEmail, string nvUserName, string nvPassword, int iPermissionType)
        {
            User.SetUser(iPersonId, iUserId, nvLastName, nvFirstName, nvPhone, nvEmail, nvUserName, nvPassword, iPermissionType);
        }



        #endregion
        #region Avrech

        public List<Avrech> GetAllAvrechim(int? iPersonId)
        {
            return Avrech.GetAvrechim(iPersonId);
        }
        public Avrech GetAvrechById(int? iPersonId)
        {
            return Avrech.GetAvrechById(iPersonId);
        }
        #endregion
        #region files

        public string SaveFileByBase64(string base64File, string fileName)
        {
            return Fileshandler.SaveFileByBase64(base64File, fileName);
        }

        #endregion
    }


}
