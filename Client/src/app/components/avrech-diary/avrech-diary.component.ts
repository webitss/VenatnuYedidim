import { Component, OnInit, Output, Input, ViewChild } from '@angular/core';
import { Task } from '../../classes/task';
import { TaskComponent } from '../../components/task/task.component'
import { CalendarComponent } from '../calendar/calendar.component';
import { calendar } from '../../../../node_modules/ngx-bootstrap/chronos/moment/calendar';

@Component({
  selector: 'app-avrech-diary',
  templateUrl: './avrech-diary.component.html',
  styleUrls: ['./avrech-diary.component.css']
})
export class AvrechDiaryComponent implements OnInit {

  constructor() { }

  @ViewChild('task') TaskComponent: TaskComponent;
  @ViewChild('calendar') CalendarComponent: CalendarComponent;

  @Output()
  flag: boolean = false;

  @Output()
  @Input()
  task: Task;

  ngOnInit() {
    this.task = new Task();
  }

  // protected currentComponent: any;

  // onRouterOutletActivate(event) {
  //     
  //   this.currentComponent = event;
  // }
  closeMe(){
    this.flag= false;
  }
  addTask() {
    this.flag = true;
    // this.task = new Task()
  }
  saveTask() {
    this.TaskComponent.saveTask().then(res=>{
    this.CalendarComponent.refreshMe()});

   
    //שמירה
    //this.task = null;
    //this.currentComponent.saveTask();
  }
  close() {
    // this.task = null;
    this.flag = false
  }
  
}
