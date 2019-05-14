import { Component, OnInit, Input } from '@angular/core';
import { KeyValue } from '../../classes/key-value';
import { Avrech } from '../../classes/avrech';
import { AppProxy } from '../../services/app.proxy';
import { Task } from 'src/app/classes/task';
import { VyTableColumn } from 'src/app/templates/vy-table/vy-table.classes';

@Component({
  selector: 'app-settings-reports',
  templateUrl: './settings-reports.component.html',
  styleUrls: ['./settings-reports.component.css']
})
export class SettingsReportsComponent implements OnInit {

  constructor(private appProxy: AppProxy) { }
  @Input()
  reports:Array<KeyValue>;
  tasks:Task[];
  public iReportId: number;
  // public iAvrechId:number;
  public lstColumns: Array<VyTableColumn> = new Array<VyTableColumn>();

  avrechList:Avrech[];
  AvrechSelected:Avrech=null;
 
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
          debugger;

    this.appProxy.post("GetTasksByPersonIdBetweenDates", { iPersonId: this.AvrechSelected.iPersonId,fromDate:Date.parse(this.fromDate.toString()),toDate:Date.parse(this.toDate.toString()) }).then(data => {
      debugger;
      this.tasks = data;
      }); 
  }
}
