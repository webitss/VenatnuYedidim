import { Component, OnInit, Input,Output, EventEmitter } from '@angular/core';
import{Task} from "../../classes/task"
import { SysTableService } from '../../services/sys-table.service';
import { AppProxy } from '../../services/app.proxy';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

@Input()
@Output()
taskTypeList:Array<any>;
@Output()
@Input()
task:Task;
currentTask:Task;
selectType:string;
type:Task;

  constructor(private appProxy: AppProxy ,private sysTableService:SysTableService) { }

  minutes: string;
  hours: string;

  ngOnInit() {
    // this.appProxy.post("GetTask", { iPersonId: 1 }).then(
    //   data => {
    //     //alert("good");
    //     this.taskList = data;
        this.sysTableService.getValues(SysTableService.dataTables.Task.iSysTableId).then(data => {
          this.taskTypeList=data;
          //this.task.iTaskType=this.type['iSysTableRowId'];

          
          // this.sysTableRowList =  data;
        //   this.meetingList.forEach(m => {
        //     m['nvDate'] = m.dtMeetingDate.toLocaleDateString();
        //     m['nvHour'] = m.dtMeetingDate.toLocaleTimeString();
        //     m['edit'] ='<div class="edit"></div>';
        //     m['nvMeetingType'] = this.sysTableRowList.filter(s=> s.iSysTableRowId == m.iMeetingType)[0].nvValue;
        // });
        this.currentTask = new Task();
        this.currentTask = Object.assign({},this.task);
        
         this.currentTask['dtDate'] = new Date((this.currentTask.dtTaskdatetime).getTime());
     
         // this.meeting['dtHour'] = new Date((this.meeting.dtMeetingDate).getHours()) + ':'+new Date((this.meeting.dtMeetingDate).getMinutes());
         if ((this.task.dtTaskdatetime).getMinutes() < 10)
           this.minutes = '0' + (this.currentTask.dtTaskdatetime).getMinutes().toString();
         else
           this.minutes = (this.currentTask.dtTaskdatetime).getMinutes().toString();
     
         if ((this.currentTask.dtTaskdatetime).getHours() < 10)
           this.hours = '0' + (this.currentTask.dtTaskdatetime).getHours().toString();
         else
           this.hours = (this.currentTask.dtTaskdatetime).getHours().toString();
     
     
         this.currentTask['dtHour'] = this.hours + ':' + this.minutes;
          
        });
     this.task=new Task();
     this.task.nvComment=" עם התלמיד: "
         
      }
    // );

    saveTask() {
      // alert("id:"+ this.task.iTaskId);
      // alert("dtTaskdate:" +this.task.dtTaskdate);
      // alert("iTaskType:" +this.task.iTaskType);
      // alert("tTaskTime:" +this.task.tTaskTime);
      this.task.dtTaskdatetime = new Date(this.currentTask['dtDate']+' '+this.currentTask['dtHour']);
      //this.task.iPersonId=
     // if(this.currentTask.iTaskId == null)
      //this.task.iPersonId = 1;

      
      // debugger;
      alert(this.task);
      alert(this.currentTask);
      // JSON.parse(localStorage.getItem("user")).iPersonId
      this.appProxy.post('SetTask', { task:this.task,iUserId:1 }).then(data => {
        if (data) {
          alert("המשימה נוספה בהצלחה!");
        }
        else
          alert("error!");
      })
    }
 

  }


