import { Injectable } from '@angular/core';
import { User } from '../classes/user';
import { Person } from '../classes/person';
import { AppProxy } from '../services/app.proxy';
import { Observable } from 'rxjs';
import { Student } from '../classes/student';

@Injectable()
export class GlobalService {

  public user: User = null;
  public student:Student;
  idPermission:number;
  
  constructor(private appProxy:AppProxy) {
    this.user = JSON.parse(localStorage.getItem("user"));
  }

getStudent(){
  return this.student;
}

  getUser() {
    return this.user;
  }

  flag: boolean = false;

  IsParticipantsExists(participantId: number, eventId: number) {
    this.appProxy.post("GetParticipantsList", { iEventId: eventId }).then(res => {
      if (res.length > 0) {
        res.forEach(p => {
          if (p.iPersonId == participantId)
            this.flag = true;
        });
      } 
    });
    return <boolean>this.flag;
  }

 public UserPermition: number = 0;
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
