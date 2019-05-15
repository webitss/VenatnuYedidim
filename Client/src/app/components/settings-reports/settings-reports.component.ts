import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { KeyValue } from '../../classes/key-value';
import { Avrech } from '../../classes/avrech';
import { AppProxy } from '../../services/app.proxy';
import { Task } from '../../classes/task';
import { VyTableColumn } from '../../templates/vy-table/vy-table.classes';
import { SysTableService } from '../../services/sys-table.service';
import { SysTableRow } from '../../classes/SysTableRow';
import { VyTableComponent } from '../../templates/vy-table/vy-table.component';

@Component({
  selector: 'app-settings-reports',
  templateUrl: './settings-reports.component.html',
  styleUrls: ['./settings-reports.component.css']
})
export class SettingsReportsComponent implements OnInit {

  constructor(private appProxy: AppProxy,private sysTableService:SysTableService) { }
  @Input()
  reports:Array<KeyValue>;
  @ViewChild('tasks') tasks: any;
  @ViewChild(VyTableComponent) vyTableComponent: VyTableComponent;

  tasksList=[];
  flag=0;
  public iReportId: number;
  // public iAvrechId:number;

  avrechList:Avrech[];
  AvrechSelected:Avrech=null;
  lstValues: SysTableRow[];
  fromDate:Date;
  toDate:Date;

  ngOnInit() {
    this.reports = [
      { id: 1, text: "משימות לאברך" }
    ];
    this.appProxy.post("GetAllAvrechim").then(date => { this.avrechList = date; })
    this.iReportId = this.reports[0].id;
    // this.iAvrechId=this.avrechList[0].iPersonId;
    
  }

  downloadExcel(t = null) {

    this.tasks.downloadExcel(t)
  }

  public lstColumns = [
    new VyTableColumn('שעה', 'nvHour'),
    new VyTableColumn('סוג משימה', 'taskType'),
    new VyTableColumn('הערה', 'nvComment'),
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

          // Date.parse(this.fromDate.toString())
    this.appProxy.post("GetTasksByPersonIdBetweenDates", { iPersonId: this.AvrechSelected.iPersonId,fromDate:this.fromDate,toDate:this.toDate }).then(data => {

      this.tasksList = data;
      this.tasksList.forEach(e => {

        e["nvHour"] = e.dtTaskdatetime.toLocaleTimeString();
        e["nvComment"]=e.nvComments;
      });
      }); 

     
      this.sysTableService.getValues(SysTableService.dataTables.Task.iSysTableId).then(data => {
        this.tasksList.forEach(e => {
          this.lstValues = data;

          e["taskType"] = data.filter(s => s.iSysTableRowId == e["iTaskType"])[0].nvValue;
        });
      });

      this.downloadExcel();
  }

}




// data[0].dtTaskdatetime.toLocaleTimeString()