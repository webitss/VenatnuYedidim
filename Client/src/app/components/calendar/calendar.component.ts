import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, OnInit, Output, Input, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { AppProxy } from "../../services/app.proxy"
import { ActivatedRoute } from '@angular/router';
import { Task } from '../../classes/task';
import { ArrayObservable } from 'rxjs/observable/ArrayObservable';
import { SysTableService } from '../../services/sys-table.service';
import { GlobalService } from '../../services/global.service';
import { TaskComponent } from '../task/task.component';
import { SrvRecord } from 'dns';
import { Conversation } from '../../classes/conversation';
import { callbackify } from 'util';
import { promise } from 'protractor';
import { Meeting } from '../../classes/meeting';
@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})


export class CalendarComponent implements OnInit {
  @Output()
  daysNameArr: Array<string> = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];
  daysMonthNameArr: any[][] = [];// = new Array();
  i: number;
  oneOfMonth: any;
  lenOfMonth: any;
  // dayOfWeek: number;
  dayOfMonth: number;
  year: number;
  @Input()
  month: number;
  day: number;
  d: number;
  flag: boolean = false;
  // @ViewChild('task') taskComponent: TaskComponent;
  @Output()
  @Input()
  @ViewChild(TaskComponent) child: TaskComponent;
  openNewTask: boolean = false;
  task: Task;
  conversation:Conversation;
  meeting:Meeting;
  id: number;
  flagDelete = false;
  message = '';
  header = 'מחיקת משימה';

  taskList: Array<Task> = new Array<Task>();
  conversationList:Array<Conversation>=new Array<Conversation>();
  taskTypeList: Array<any>;
  conversationTypeList: Array<any>;
  meetingList:Array<Meeting>=new Array<Meeting>();
  meetingType:Array<any>;
  editTask1: boolean;
  editTask(taskId: number) {

    this.flag = true;
    this.editTask1 = true;
    this.task = this.taskList.find(t => t.iTaskId == taskId);
    this.conversation=this.conversationList.find(c=>c.iConversationId==taskId);
    this.meeting=this.meetingList.find(m=>m.iMeetingId==taskId);
  }
  saveTask() {
    this.child.saveTask(true);

  }
  close() {
    this.editTask1 = false
  }
  closeMe(task: Task) {
    this.editTask1 = false;
  }
  // public refreshMe(task: Task) {
  //   this.taskList.push(task);
  //   this.cdRef.detectChanges();
  // }
  public refreshMe() {
    this.appProxy.post("GetTasksByPersonId", { iPersonId: this.id }).then(
      data1 => {
        //if (data != null) {
        this.taskList = data1;

        this.sysTableService.getValues(SysTableService.dataTables.Task.iSysTableId).then(data => {
          this.taskTypeList = data;
          this.createCalendar();
        });
      });
              this.appProxy.post("GetConversationsByAvrechId",{iAvrechId:this.id}).then(data=>{
          if(data)
          {
            this.conversationList=data;

          }
        this.sysTableService.getValues(SysTableService.dataTables.conversationType.iSysTableId).then(data => {
          if(data)
          {          
            this.conversationTypeList = data;
debugger;
            this.createCalendar();
          }
        });
      })
      this.appProxy.post("GetMeetingsByAvrechId",{iAvrechId:this.id}).then(data=>{
        if(data)
        {
          this.meetingList=data;

        }
      this.sysTableService.getValues(SysTableService.dataTables.meetingType.iSysTableId).then(data => {
        if(data)
        {
          this.meetingType = data;
          debugger;
          this.createCalendar();
        }
        //}
      });
    })
    this.createCalendar();
  }
  ngOnInit() {
    // this.task = new Task();

   
    this.month = new Date().getMonth() + 1;
    this.year = new Date().getFullYear();

    this.activatedRoute.parent.params.subscribe(params => {
      this.id = params['iPersonId'];
    })
      this.refreshMe();

      this.createCalendar();
  }
  @Output()
  @Input()
  t: any;
  len: number = 0;
  typeText: string;
  end: number;
  createCalendar() {

    this.oneOfMonth = new Date(this.year, this.month - 1, 1).getDay() + 1;
    this.lenOfMonth = new Date(this.year, this.month, 0).getDate();
    this.end = (this.lenOfMonth + this.oneOfMonth) / 7;
    if (this.end - Number.parseInt(((this.lenOfMonth + this.oneOfMonth) / 7).toString()) == 0)
      this.end -= 1;
    else this.end = Number.parseInt(((this.lenOfMonth + this.oneOfMonth) / 7).toString());
    this.d = 1;

    this.daysMonthNameArr = [];
    for (this.i = 0; this.i < (this.lenOfMonth + this.oneOfMonth) / 7; this.i++) {

      this.daysMonthNameArr[this.i] = [];

      for (let j = 0; j < 7; j++) {

        //  this.daysMonthNameArr[this.i][j]["task"] = false;
        if (this.i == 0 && j < this.oneOfMonth - 1 || this.d > this.lenOfMonth)
        {

                    this.daysMonthNameArr[this.i][j] = { number: "" };
        }
        else {  
          let tasks = Array<any>();
          // let tasks=Array<Task>();
          //הוספת משימה
          this.taskList.forEach(task => {

            if (task.dtTaskdatetime.getDate() == this.d && task.dtTaskdatetime.getMonth() + 1 == this.month && task.dtTaskdatetime.getFullYear() == this.year) {
              this.typeText=null;

              this.taskTypeList.forEach(type => {

                if (type.iSysTableRowId == task.iTaskType) {

                  this.typeText = type.nvValue;             
                }
              });
              let t = this.typeText + " " + task.dtTaskdatetime.getHours() + ":" + task.dtTaskdatetime.getMinutes();
              //alert(t);
              tasks.push({ string: t, id: task.iTaskId, i: this.i, j: j });
              // if(tasks.length>0)
              // debugger;
            }
          });
          this.conversationList.forEach(conver=>{

            if(conver.dtConversationDate.getDate()==this.d&&conver.dtConversationDate.getMonth()+1==this.month&&conver.dtConversationDate.getFullYear()==this.year){
              this.typeText=null;
              this.conversationTypeList.forEach(type=>{
                if(type.iSysTableRowId==conver.iConversationType){
                  this.typeText="שיחה "+type.nvValue;
                }
              })
              let t = this.typeText + " " + conver.dtConversationDate.getHours() + ":" + conver.dtConversationDate.getMinutes();
             // alert(t);
              tasks.push({ string: t, id: conver.iConversationId, i: this.i, j: j });
              // if(tasks.length>0)
              // debugger;
            }
          })


          this.meetingList.forEach(meeting=>{

            if(meeting.dtMeetingDate.getDate()==this.d&&meeting.dtMeetingDate.getMonth()+1==this.month&&meeting.dtMeetingDate.getFullYear()==this.year){
              this.typeText=null;
              this.meetingType.forEach(type=>{
                // alert(type.nvValue);
                if(type.iSysTableRowId==meeting.iMeetingType){
                  this.typeText="פגישה "+type.nvValue;

                }
              })
              let t = this.typeText + " " + meeting.dtMeetingDate.getHours() + ":" + meeting.dtMeetingDate.getMinutes();
              //alert(t);
              tasks.push({ string: t, id: meeting.iMeetingId, i: this.i, j: j });
if(tasks.length>0)
debugger;
            }
          })
          //  this.daysMonthNameArr[this.i][j] = {number:this.d};

          this.daysMonthNameArr[this.i][j] = { tasks: tasks, number: this.d, len: tasks.length };
          this.d++;
        }
      }
    }
    this.cdRef.detectChanges();

  }

  constructor(private cdRef: ChangeDetectorRef, private activatedRoute: ActivatedRoute, private appProxy: AppProxy, private sysTableService: SysTableService, private globalService: GlobalService) { }

  prevMonth() {
    if (this.month == 1) {
      this.month = 12;
      this.year -= 1;
    }
    else
      this.month -= 1;
    this.createCalendar()
  }

  nextMonth() {
    if (this.month == 12) {
      this.month = 1;
      this.year += 1;
    }
    else
      this.month += 1;
    this.createCalendar()
  }
  // @Output()
  // @Input()
  // task: Task;

  taskId;
  taskI;
  taskJ;

  delTask(taskId: number, i: number, j: number) {
   debugger;
    this.flagDelete = true;
    this.taskId = taskId;
    this.taskI = i;
    this.taskJ = j;
    this.message = 'האם אתה בטוח שברצונך למחוק משימה זו?';
    this.cdRef.detectChanges();
  }


  deleteTask() {
    this.task = this.taskList.find(t => t.iTaskId == this.taskId);
    this.conversation=this.conversationList.find(c=>c.iConversationId==this.taskId);
    this.meeting=this.meetingList.find(m=>m.iMeetingId==this.taskId);
if(this.task)
{
      this.appProxy.post("DeleteTask", { iTaskId: this.taskId, iPersonId: this.globalService.getUser().iPersonId }).then(
      data => {
        if (data == true) {
         
          // this.task=this.taskList.find(t => t.iTaskId == taskId);

          this.daysMonthNameArr[this.taskI][this.taskJ]['tasks'].splice(this.daysMonthNameArr[this.taskI][this.taskJ]['tasks'].indexOf(this.daysMonthNameArr[this.taskI][this.taskJ]['tasks'].find(t => t.id == this.taskId)), 1);
          this.cdRef.detectChanges();

        }
      });
}
else
if(this.conversation)
{
  this.appProxy.post("DeleteConversations",{iConversationId:this.conversation.iConversationId,iUserId:this.globalService.getUser().iPersonId}).then(
    data=>{
      if(data){
          this.daysMonthNameArr[this.taskI][this.taskJ]['tasks'].splice(this.daysMonthNameArr[this.taskI][this.taskJ]['tasks'].indexOf(this.daysMonthNameArr[this.taskI][this.taskJ]['tasks'].find(t => t.id == this.taskId)), 1);
          this.cdRef.detectChanges();

      }
    }
  )
}
else
this.appProxy.post("DeleteMeeting",{iMeetingId:this.meeting.iMeetingId,iUserId:this.globalService.getUser().iPersonId}).then(
  data=>{
    if(data)
    {
                this.daysMonthNameArr[this.taskI][this.taskJ]['tasks'].splice(this.daysMonthNameArr[this.taskI][this.taskJ]['tasks'].indexOf(this.daysMonthNameArr[this.taskI][this.taskJ]['tasks'].find(t => t.id == this.taskId)), 1);
          this.cdRef.detectChanges();

    }
  }
)
  }

  // public trackItem(index: number, item: any) {
  //   return item.trackId;
  // }

  // message: string = "האם אתה בטוח שברצונך למחוק משימה זו?";
  // flagPopUp: boolean = false;
  // header: string = "מחיקת משימה"
}
