import { Component, OnInit, ViewChild } from '@angular/core';

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
  @ViewChild('users') users:any;

  ngOnInit() {
    this.iPersonId = 0;
    this.appProxy.post("GetUsers", { iPersonId: this.iPersonId }).then(data => {
      this.lstDataRows = data;

      this.lstDataRows.forEach(u => {

        u["edit"] = "<div class='edit'></div>";
      });

      this.sysTableService.getValues(SysTableService.dataTables.permissionType.iSysTableId).then(data => {
        this.lstDataRows.forEach(user => {
          this.lstValues = data;
          user["nvPermittion"] = data.filter(s => s.iSysTableRowId == user["iPermissionId"])[0].nvValue;
        });
      });
    });

  }


  private iPersonId: number;
  private lstValues: any;


  public lstColumns = [
    new VyTableColumn('עריכה', 'edit', 'html', true,false),
    new VyTableColumn('שם משפחה', 'nvLastName'),
    new VyTableColumn('שם פרטי', 'nvFirstName'),
    new VyTableColumn('נייד', 'nvMobile'),
    new VyTableColumn('שם משתמש', 'nvUserName'),
    new VyTableColumn('הרשאה', 'nvPermittion'),
  ];
  public lstDataRows = [];



  editUser(u: User) {
    this.router.navigate(['users/user/', u.iPersonId]);
  }
  tableToExcel(){
    this.users.tableToExcel();
  }
}
