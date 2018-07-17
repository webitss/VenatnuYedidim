import { Component, OnInit } from '@angular/core';

import { user } from '../../classes/user';
import { AppProxy } from '../../services/app.proxy';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private appProxy: AppProxy) { }

  users: user[];
  id:number=1;

  ngOnInit() {
    .then(
      data=>{
      this.users=data;
       }).catch(err=>{
         alert(err);
       });
  }

}
