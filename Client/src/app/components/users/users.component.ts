import { Component, OnInit } from '@angular/core';

import { User } from '../../classes/user';
import { AppProxy } from '../../services/app.proxy';
import { Router } from '@angular/router';
import { VyTableColumn } from '../../templates/vy-table/vy-table.classes';

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

      this.lstDataRows.forEach(u => {

        u["edit"] = "<p>ערוך</p>";
      });
    });
  }

  private users: Array<User>;

  private iPersonId: number;


  public lstColumns = [
    new VyTableColumn('עריכה', 'edit', 'html', true),
    new VyTableColumn('שם משפחה', 'nvLastName'),
    new VyTableColumn('שם פרטי', 'nvFirstName'),
    new VyTableColumn('נייד', 'nvMobile'),
    new VyTableColumn('שם משתמש', 'nvUserName'),
    new VyTableColumn('הרשאה', 'iPermissionId'),
  ];
  public lstDataRows = [];



  editUser(u: User) {
    this.router.navigate(['users/user/', u.iPersonId]);
  }
}
