import { Injectable } from '@angular/core';
import { User } from '../classes/user';

@Injectable()
export class GlobalService {

  public user: User = null;
  constructor() { 
    this.user = JSON.parse(localStorage.getItem("user"));
  }

  getUser(){
    return this.user;
  }
 public UserPermition:number=0;
  // setUser(usr: User){
  //   this.user.dtBirthdate = usr.dtBirthdate;
  //   this.user.dtCreatedate = usr.dtCreatedate;
  //   this.user.iPermissionId = usr.iPermissionId;
  //   this.user.iPersonId = usr.iPersonId;
  //   this.user.nvAddress = usr.nvAddress;
  //   this.user.nvBirthdate = usr.nvBirthdate;
  //   this.user.nvCity = usr.nvCity;
  //   this.user.nvEmail = usr.nvEmail;
  //   this.user.nvFirstName = usr.nvFirstName;
  //   this.user.nvIdentityCard = usr.nvIdentityCard;
  //   this.user.nvLastName = usr.nvLastName;
  //   this.user.nvMobile = usr.nvMobile;
  // }
}
