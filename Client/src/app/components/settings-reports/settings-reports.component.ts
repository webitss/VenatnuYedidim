import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { KeyValue } from '../../classes/key-value';
import { Avrech } from '../../classes/avrech';
import { AppProxy } from '../../services/app.proxy';
import { Task } from '../../classes/task';
import { VyTableColumn } from '../../templates/vy-table/vy-table.classes';
import { SysTableService } from '../../services/sys-table.service';
import { SysTableRow } from '../../classes/SysTableRow';
import { VyTableComponent } from '../../templates/vy-table/vy-table.component';
import { GlobalService } from '../../services/global.service';
import { Action } from '../../classes/action';

@Component({
  selector: 'app-settings-reports',
  templateUrl: './settings-reports.component.html',
  styleUrls: ['./settings-reports.component.css']
})
export class SettingsReportsComponent implements OnInit {

  constructor(private appProxy: AppProxy,private sysTableService:SysTableService,private globalService: GlobalService) { }
  @Input()
  reports:Array<KeyValue>;

  iUserId:number;
  flags:Array<boolean>=[false];
  flagSave:boolean=false;
  tasksToExcel=[];
  header:string=null;
  currentComponent;
  @ViewChild('tasks') tasks: any;
  @ViewChild(VyTableComponent) vyTableComponent: VyTableComponent;


  ngOnInit() {
    this.reports = [
      { id: 1, text: "משימות לאברך" },
      { id: 2, text:"ימי הולדת"}
    ];
    this.iUserId = this.globalService.getUser().iPermissionId == SysTableService.permissionType.Management ? 0 : this.globalService.getUser().iPersonId;

}
choose(report){
  debugger;
var option=parseInt(report.value);
this.header=this.reports[option-1].text;
switch(option)
{
  case 1:
    this.flags=[false];
    this.flags[0]=true;
    this.flagSave=true;
    break;
  case 2:
      this.flags=[false];
      this.flags[1]=true;
      this.flagSave=true;
    break;

}


}
// produceReport(){

//   this.downloadExcel(this.tasksToExcel);

// }

// downloadExcel(t) {

//   this.tasks.downloadExcel(t)
// }
}

// data[0].dtTaskdatetime.toLocaleTimeString()