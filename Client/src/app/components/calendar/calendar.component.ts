import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, OnInit, Output, Input, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { AppProxy } from "../../services/app.proxy"
import { ActivatedRoute } from '@angular/router';
import { Task } from '../../classes/task';
import { ArrayObservable } from 'rxjs/observable/ArrayObservable';
import { SysTableService } from '../../services/sys-table.service';
import { GlobalService } from '../../services/global.service';
import { TaskComponent } from '../task/task.component';
import { SrvRecord } from 'dns';
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
  task: Task
  id: number;

  taskList: Array<Task> = new Array<Task>();
  taskTypeList: Array<any>;


  editTask1: boolean;
  editTask(taskId: number) {
    this.flag = true;
    this.editTask1 = true;
    this.task = this.taskList.find(t => t.iTaskId == taskId);

  }
  saveTask() {
    this.child.saveTask();

  }
  close() {
    this.editTask1 = false
  }
  closeMe() {
    this.editTask1 = false;
  }
  refreshMe(task: Task) {
    this.taskList.push(task);
    this.cdRef.detectChanges();
  }
  ngOnInit() {
    // this.task = new Task();

    // alert(this.daysMonthNameArr);
    this.month = new Date().getMonth() + 1;
    this.year = new Date().getFullYear();

    this.activatedRoute.parent.params.subscribe(params => {
      this.id = params['iPersonId'];
    })

    this.appProxy.post("GetTasksByPersonId", { iPersonId: this.id }).then(
      data1 => {
        //if (data != null) {
        this.taskList = data1;

        this.sysTableService.getValues(SysTableService.dataTables.Task.iSysTableId).then(data => {
          this.taskTypeList = data;
          this.createCalendar();

          //}
        });
      });

    //  alert(new Date().getDay());
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
    debugger
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
          this.daysMonthNameArr[this.i][j] = { number: "" };
        else {
          let tasks = Array<any>();
          // let tasks=Array<Task>();
          //הוספת משימה
          this.taskList.forEach(task => {
            if (task.dtTaskdatetime.getDate() == this.d && task.dtTaskdatetime.getMonth() + 1 == this.month && task.dtTaskdatetime.getFullYear() == this.year) {
              this.taskTypeList.forEach(type => {
                if (type.iSysTableRowId == task.iTaskType) {
                  this.typeText = type.nvValue;
                }
              });
              let t = this.typeText + " " + task.dtTaskdatetime.getHours() + ":" + task.dtTaskdatetime.getMinutes();
              tasks.push({ string: t, id: task.iTaskId, i: this.i, j: j });
              // tasks.push(task);
              //this.t = task;
            }
          });
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


  deleteTask(taskId: number, i: number, j: number) {
    this.appProxy.post("DeleteTask", { iTaskId: taskId, iPersonId: this.globalService.getUser().iPersonId }).then(
      data => {
        if (data == true) {
          // alert("task remove");
          // this.task=this.taskList.find(t => t.iTaskId == taskId);
          alert(this.daysMonthNameArr[i][j]['tasks'].indexOf(this.daysMonthNameArr[i][j]['tasks'].find(t => t.id == taskId)));
          this.daysMonthNameArr[i][j]['tasks'].splice(this.daysMonthNameArr[i][j]['tasks'].indexOf(this.daysMonthNameArr[i][j]['tasks'].find(t => t.id == taskId)), 1);
          //  window.location.reload();
          this.cdRef.detectChanges();
        }
      });
  }

  public trackItem(index: number, item: any) {
    return item.trackId;
  }





  message: string = "האם אתה בטוח שברצונך למחוק משימה זו?";
  flagPopUp: boolean = false;
  header: string = "מחיקת משימה"
}
