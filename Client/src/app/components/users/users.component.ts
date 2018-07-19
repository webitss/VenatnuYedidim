import { Component, OnInit } from '@angular/core';

import { User } from '../../classes/user';
import { AppProxy } from '../../services/app.proxy';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private appProxy: AppProxy, private router: Router) { }

  ngOnInit() {
    this.iPersonId = 0;
   this.appProxy.post("GetUsers",{iPersonId: this.iPersonId})
    .then(
      data=>{
      this.users=data;
       });
  }

  private users: Array<User>;
  private iPersonId:number;

  editUser(u: User){
    this.router.navigate(['users/user/',u.iPersonId]);
  }
}
