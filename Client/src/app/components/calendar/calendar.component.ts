import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, OnInit, Output, Input } from '@angular/core';
// import {startOfDay,endOfDay, subDays,addDays,endOfMonth,isSameDay, isSameMonth, addHours} from 'date-fns';
import { Subject } from 'rxjs';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import {
//   CalendarEvent,
//   CalendarEventAction,
//   CalendarEventTimesChangedEvent,
//   CalendarView
// } from 'angular-calendar';

// const colors: any = {
//   red: {
//     primary: '#ad2121',
//     secondary: '#FAE3E3'
//   },
//   blue: {
//     primary: '#1e90ff',
//     secondary: '#D1E8FF'
//   },
//   yellow: {
//     primary: '#e3bc08',
//     secondary: '#FDF1BA'
//   }
// };
@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})


export class CalendarComponent implements OnInit {
  @Output()
  daysNameArr: Array<string> = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];
  daysMonthNameArr: number[][];// = new Array();
  i: number;
  oneOfMonth: any;
  lenOfMonth: any;
  // dayOfWeek: number;
  dayOfMonth: number;
  year: number;
  month: number;
  day: number;
  d: number;


  @Output()
  @Input()
  openNewTask: boolean = false;
  ngOnInit() {

    this.month = new Date().getMonth() + 1;
    this.year = new Date().getFullYear();

    this.createCalendar();
    //  alert(new Date().getDay());
  }

  createCalendar() {
    debugger


    // this.dayOfWeek = new Date().getDay();
    alert((new Date(this.year,12, 1).getDay()-2)%7);
    this.oneOfMonth = new Date(this.year, this.month, 1).getDay();
    this.lenOfMonth = new Date(this.year, this.month, 0).getDate();

    this.d = 1;


    this.daysMonthNameArr = [];
    for (this.i = 0; this.i < (this.lenOfMonth + this.oneOfMonth) / 7; this.i++) {
      this.daysMonthNameArr[this.i] = [];
      // this.daysMonthNameArr[i]=new Array<number>();
      for (let j = 0; j < 7; j++) {
        if (this.i == 0 && j < this.oneOfMonth - 1 || this.d > this.lenOfMonth)
          this.daysMonthNameArr[this.i][j] = 0;
        else
          this.daysMonthNameArr[this.i][j] = this.d++;
      }
    }
  }

  constructor() { }

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
