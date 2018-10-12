import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { AppProxy } from '../../services/app.proxy';

@Component({
  selector: 'app-student-events',
  templateUrl: './student-events.component.html',
  styleUrls: ['./student-events.component.css']
})
export class StudentEventsComponent implements OnInit {

  private iPersonId: number;

  constructor(private globalService: GlobalService, private appProxy: AppProxy) { }

  ngOnInit() {
    // this.iPersonId = this.globalService.getUser()['iUserId'];
    // this.appProxy.post("GetParticipantsList", { iPersonId: this.iPersonId }).then(data => {
    //   this.lstDataRows = data;
    //   this.lstDataRows.forEach(u => {
    //     u["edit"] = "<div class='edit'></div>";
    //     u["delete"] = "<div class='delete'></div>";
    //   });
    //   this.sysTableService.getValues(SysTableService.dataTables.permissionType.iSysTableId).then(data => {
    //     this.lstDataRows.forEach(user => {
    //       this.lstValues = data;
    //       user["nvPermittion"] = data.filter(s => s.iSysTableRowId == user["iPermissionId"])[0].nvValue;
    //     });
    //   });
    // }).catch(err=>{
    //   alert(err);
    // });
  }

}
