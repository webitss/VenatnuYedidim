import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, OnInit, Output, Input } from '@angular/core';
import { AppProxy } from "../../services/app.proxy"
import { ActivatedRoute } from '@angular/router';
import { Task } from '../../classes/task';
@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})


export class CalendarComponent implements OnInit {
  @Output()
  daysNameArr: Array<string> = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];
  daysMonthNameArr: any[][];// = new Array();
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


  @Output()
  @Input()
  openNewTask: boolean = false;

  id: number;

  taskList: Array<Task> = new Array<Task>();

  ngOnInit() {

    this.month = new Date().getMonth() + 1;
    this.year = new Date().getFullYear();

    this.activatedRoute.parent.params.subscribe(params => {
      this.id = params['iPersonId'];
    })
    this.appProxy.post("GetTasksByPersonId", { iPersonId: this.id }).then(
      data => {
        this.taskList = data;
        this.createCalendar();

      });


    //  alert(new Date().getDay());
  }

  createCalendar() {

    this.oneOfMonth = new Date(this.year, this.month - 1, 1).getDay() + 1;
    this.lenOfMonth = new Date(this.year, this.month, 0).getDate();

    this.d = 1;

    this.daysMonthNameArr = [];
    for (this.i = 0; this.i < (this.lenOfMonth + this.oneOfMonth) / 7; this.i++) {
      this.daysMonthNameArr[this.i] = [];
      // this.daysMonthNameArr[i]=new Array<number>();
      for (let j = 0; j < 7; j++) {
        if (this.i == 0 && j < this.oneOfMonth - 1 || this.d > this.lenOfMonth)
          this.daysMonthNameArr[this.i][j] = 0;
        else {
          this.daysMonthNameArr[this.i][j] = this.d;
          //הוספת משימה
          this.taskList.forEach(task => {
            debugger
            if (task.dtTaskdatetime.getDate() == this.d && task.dtTaskdatetime.getMonth()+1 == this.month && task.dtTaskdatetime.getFullYear() == this.year)
              this.daysMonthNameArr["task"] = "dsad";
          });
          this.d++;
        }
      }
    }
  }

  constructor(private activatedRoute: ActivatedRoute, private appProxy: AppProxy) { }

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

}
