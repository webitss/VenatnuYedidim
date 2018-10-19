import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';

import { User } from '../../classes/user';
import { AppProxy } from '../../services/app.proxy';
import { Router } from '@angular/router';
import { VyTableColumn } from '../../templates/vy-table/vy-table.classes';
import { SysTableRow } from '../../classes/SysTableRow';
import { SysTableService } from '../../services/sys-table.service';
import { GlobalService } from '../../services/global.service';
import { VyTableComponent } from '../../templates/vy-table/vy-table.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private appProxy: AppProxy, private router: Router, private sysTableService: SysTableService, public globalService: GlobalService) { }
  @ViewChild('users') users: any;
  @ViewChild(VyTableComponent) vyTableComponent: VyTableComponent;

  // @Output()
  //  onRemoveUser: EventEmitter<User> = new EventEmitter<User>();

  ngOnInit() {
    this.iPersonId = this.globalService.getUser()['iUserId'];
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
    }).catch(err=>{
      alert(err);
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

  private alert: any;
  private flag: boolean = false;
  deleteUser(u: User) {
    if (u.iPermissionId == 5) //מנהל
      this.alert = confirm("יתכן ולאחר המחיקה לא יהיה מנהל למערכת ,האם אתה בטוח שברצונך למחוק מנהל?");
    else
      this.alert = confirm("האם אתה בטוח שברצונך למחוק משתמש זה?");

    if (this.alert == true) {
      this.appProxy.post('DeleteUser', { iPersonId: u.iPersonId, iUserId: this.globalService.getUser().iPersonId }).then(data => { }).catch(err => {
        alert(err);
      });
      this.lstDataRows.splice(this.lstDataRows.indexOf(u), 1);
      this.vyTableComponent.refreshTable(this.lstDataRows);
    }
  }

  downloadExcel() {
    this.users.downloadExcel();
  }

  tableToPdf(name: string) {
    this.users.downloadPdf(name, 'pdf');
  }
}
