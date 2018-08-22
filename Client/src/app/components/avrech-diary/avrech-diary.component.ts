import { Component, OnInit, Output, Input, ViewChild } from '@angular/core';
import { Task } from '../../classes/task';
import {TaskComponent}from '../../components/task/task.component'

@Component({
  selector: 'app-avrech-diary',
  templateUrl: './avrech-diary.component.html',
  styleUrls: ['./avrech-diary.component.css']
})
export class AvrechDiaryComponent implements OnInit {

  constructor() { }

  @ViewChild('task') TaskComponent:TaskComponent;

  @Output()
  flag: boolean = false;

  @Output()
  @Input()
  task: Task;

  ngOnInit() { 
    this.task=new Task();
  }

  // protected currentComponent: any;

  // onRouterOutletActivate(event) {
  //   debugger;
  //   this.currentComponent = event;
  // }
  addTask() {
    this.flag=true;
   // this.task = new Task()
  }
  saveTask() {
    debugger;
    this.TaskComponent.saveTask();

    // alert("type: "+this.task.iTaskType);
    // alert("dtTaskdate: "+this.task.dtTaskdate);
    // alert("tTaskTime: "+this.task.tTaskTime);
    //שמירה
    //this.task = null;
    //this.currentComponent.saveTask();
  }
  close(){
   // this.task = null;
    this.flag=false
  }
}
