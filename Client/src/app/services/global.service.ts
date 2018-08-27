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

}
