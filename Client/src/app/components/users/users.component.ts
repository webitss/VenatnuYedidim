import { Component, OnInit } from '@angular/core';

import { User } from '../../classes/user';
import { AppProxy } from '../../services/app.proxy';
import { Router } from '@angular/router';
import { VyTableColumn } from '../../templates/vy-table/vy-table.classes';
import { SysTableRow } from '../../classes/SysTableRow';
import { SysTableService } from '../../services/sys-table.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private appProxy: AppProxy, private router: Router, private sysTableService: SysTableService) { }

  ngOnInit() {
    this.iPersonId = 0;
    this.appProxy.post("GetUsers", { iPersonId: this.iPersonId }).then(data => {
      this.lstDataRows = data;

      this.lstDataRows.forEach(u => {

        u["edit"] = "<div class='edit'></div>";
      });
    });
    // this.sysTableService.getValues(4).then(data={
    //   data.forEach(user => {
    //     user["permittionValue"] = 
    //   });
    // })
  }


  private iPersonId: number;
  private permittionValue: string;


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
