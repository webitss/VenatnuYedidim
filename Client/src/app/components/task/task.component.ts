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
selectType:string;
type:Task;

  constructor(private appProxy: AppProxy ,private sysTableService:SysTableService) { }

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
        //     m['edit'] = '<div class="edit"></div>';
        //     m['nvMeetingType'] = this.sysTableRowList.filter(s=> s.iSysTableRowId == m.iMeetingType)[0].nvValue;
        // });
      
          
        });
     this.task=new Task();
      }
    // );

    // saveTask() {
    //   debugger;
    //   alert(this.task);
    //   // this.appProxy.post("SetTask", { user: this.task, iUserId: 1 }).then(data => {
    //   //   if (data == true) {
    //   //     alert("המשימה נוספה בהצלחה!");
    //   //   }
    //   //   else
    //   //     alert("error!");
    //   // })
    // }

  }


