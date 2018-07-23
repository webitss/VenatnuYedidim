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
    this.appProxy.post("GetUsers", { iPersonId: this.iPersonId }).then(data => {
      this.lstDataRows = data;
    });
  }

  private users: Array<User>;
  private iPersonId: number;
  protected lstDataRows: any;

  public lstColumns = [{
    title: 'עריכה',
    name: 'aa',
  },
  {
    title: 'שם משפחה',
    name: 'nvLastName',
  },

  {
    title: 'שם פרטי',
    name: 'nvFirstName',
  },
  {
    title: 'נייד',
    name: 'nvMobile',
  },
  {
    title: 'מייל',
    name: 'nvEmail',
  },
  {
    title: 'שם משתמש',
    name: 'nvUserName',

    filterStyle: {
      width: '25%'
    },
    cellStyle: {
      width: '25%'
    }
  },
  {
    title: 'הרשאה',
    name: 'iPermissionType',
  }
  ]

  editUser(u: User) {
    this.router.navigate(['users/user/', u.iPersonId]);
  }
}
