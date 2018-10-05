import { Component, OnInit, ViewChild } from '@angular/core';

import { User } from '../../classes/user';
import { AppProxy } from '../../services/app.proxy';
import { Router } from '@angular/router';
import { VyTableColumn } from '../../templates/vy-table/vy-table.classes';
import { SysTableRow } from '../../classes/SysTableRow';
import { SysTableService } from '../../services/sys-table.service';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private appProxy: AppProxy, private router: Router, private sysTableService: SysTableService, private globalService: GlobalService) { }
  @ViewChild('users') users: any;

  ngOnInit() {
    this.iPersonId = this.globalService.getUser()['iUserId'];
    debugger
    this.appProxy.post("GetUsers", { iPersonId: this.iPersonId }).then(data => {
      this.lstDataRows = data;

      this.lstDataRows.forEach(u => {

        u["edit"] = "<div class='edit'></div>";
        u["delete"] = "<div class='delete'></div>";
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
    new VyTableColumn('עריכה', 'edit', 'html', true, false),
    new VyTableColumn('מחיקה', 'delete', 'html', true, false),
    new VyTableColumn('שם משפחה', 'nvLastName'),
    new VyTableColumn('שם פרטי', 'nvFirstName'),
    new VyTableColumn('נייד', 'nvMobile'),
    new VyTableColumn('שם משתמש', 'nvUserName'),
    new VyTableColumn('הרשאה', 'nvPermittion'),
  ];
  public lstDataRows = [];

  click(e) {
    if (e.columnClickName == 'edit')
      this.editUser(e);
    else
      this.deleteUser(e);

  }

  editUser(u: User) {
    this.router.navigate(['users/user/', u.iPersonId]);
  }

  deleteUser(u: User) {
    if(this.globalService.getUser().iPermissionId = 5)//הודעת אזהרה לפני מחיקת מנהל - 5 זה סטטוס מנהל

    this.appProxy.post('DeleteUser',{iPersonId: u.iPersonId}).then(data=>{

    });
  }
 //איכות 9797441 רבי טרפון
 //מונוליין 9741456
//שנהב קצות החושן 23 9941818 0527175162
  downloadExcel() {
    this.users.downloadExcel();
  }

  tableToPdf(name: string) {
    this.users.downloadPdf(name, 'pdf');
  }
}
