import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, OnInit } from '@angular/core';
// import {startOfDay,endOfDay, subDays,addDays,endOfMonth,isSameDay, isSameMonth, addHours} from 'date-fns';
import { Subject } from 'rxjs';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import {
//   CalendarEvent,
//   CalendarEventAction,
//   CalendarEventTimesChangedEvent,
//   CalendarView
// } from 'angular-calendar';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};
@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})


export class CalendarComponent implements OnInit {

  daysNameArr: Array<string> = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];
  daysMonthNameArr: Array<number> = new Array();

  oneOfMonth: any;
  dayOfWeek: number;
  dayOfMonth: number;
  year: number;
  month: number;
  ngOnInit() {

    debugger
    this.dayOfWeek = new Date().getDay() + 1;
    this.oneOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).getDay() + 1;


    //  alert(new Date().getDay());
  }
  constructor() {

  }
}
