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
    this.id=1;
   this.appProxy.post("GetUsersByPermittion",{iPersonId: this.id})
    .then(
      data=>{
      this.users=data;
       }).catch(err=>{
         alert(err);
       });
  }

  users: User[];
  id:number;

  editUser(u: User){
    this.router.navigate(['users/user/',u.iPersonId]);
  }
}
