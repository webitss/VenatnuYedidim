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
  @ViewChild('tasks') tasks: any;
  @ViewChild(VyTableComponent) vyTableComponent: VyTableComponent;

  iUserId:number;
  actionList=[];
  tasksToExcel=[];
  flag=0;
  public iReportId: number;
  // public iAvrechId:number;
currentAction:Action=new Action();
  avrechList:Avrech[];
  AvrechSelected:Avrech=null;
  lstValues1: SysTableRow[];
  lstValues2: SysTableRow[];
  lstValues3: SysTableRow[];
  fromDate:Date;
  toDate:Date;

  ngOnInit() {
    this.reports = [
      { id: 1, text: "משימות לאברך" }
    ];
    this.iUserId = this.globalService.getUser().iPermissionId == SysTableService.permissionType.Management ? 0 : this.globalService.getUser().iPersonId;

    this.appProxy.post("GetAllAvrechim",{iPersonId:this.iUserId}).then(data => { 
      this.avrechList = data; 
    })
    this.iReportId = this.reports[0].id;
    // this.iAvrechId=this.avrechList[0].iPersonId;
    
  }

  downloadExcel(t) {

    this.tasks.downloadExcel(t)
  }

  public lstColumns = [    
    new VyTableColumn('תאריך','nvDate'),
    new VyTableColumn('שעה', 'nvHour'),
    new VyTableColumn('סוג משימה', 'taskType'),
    new VyTableColumn('הערה', 'nvComment')
  ];

  selectAv(event: any) {
    debugger;
    this.avrechList.forEach(e => {
      if (e.nvFirstName+" "+e.nvLastName == event.currentTarget.value) {
        this.AvrechSelected=new Avrech();
        this.AvrechSelected.nvFirstName = e.nvFirstName;
        this.AvrechSelected.iPersonId = e.iPersonId;
      }
    })
    debugger;
  }
  produceReport(){
    this.sysTableService.getValues(SysTableService.dataTables.Task.iSysTableId).then(data1 => {
      this.lstValues1 = data1;
  });
  this.sysTableService.getValues(SysTableService.dataTables.conversationType.iSysTableId).then(data2 => {
    this.lstValues2 = data2;
});
this.sysTableService.getValues(SysTableService.dataTables.meetingType.iSysTableId).then(data3 => {
  this.lstValues3 = data3;
});

  this.appProxy.post("GetActionsByPersonIdBetweenDates", { iPersonId: this.AvrechSelected.iPersonId,fromDate:this.fromDate,toDate:this.toDate }).then(data => {
      this.actionList = data;
      this.actionList.forEach(e => {
        debugger;
        this.currentAction.nvDate=e.nvDate.split(" ")[0];
        this.currentAction.nvHour = e.nvDate.split(" ")[1];

        this.currentAction.nvComment=e.nvComment;

        //נעצרתי פה, צריך לפי אם זה משימה, שיחה או פגישה ללכת לlstvalue המתאים ולשלוף את הסוג
        if(this.lstValues1.find(x=>x.iSysTableRowId==e["iTaskType"]))
        this.currentAction.taskType = this.lstValues1.filter(s => s.iSysTableRowId == e["iTaskType"])[0].nvValue;
        else
        if(this.lstValues2.find(x=>x.iSysTableRowId==e["iTaskType"]))
        this.currentAction.taskType = this.lstValues2.filter(s => s.iSysTableRowId == e["iTaskType"])[0].nvValue;
        else
        if(this.lstValues3.find(x=>x.iSysTableRowId==e["iTaskType"]))
        this.currentAction.taskType = this.lstValues3.filter(s => s.iSysTableRowId == e["iTaskType"])[0].nvValue;

debugger;
      this.tasksToExcel.push(this.currentAction);
      this.currentAction=new Action();
      });        
       this.downloadExcel(this.tasksToExcel);

      }); 

      

        this.tasksToExcel=[];
  }

}




// data[0].dtTaskdatetime.toLocaleTimeString()