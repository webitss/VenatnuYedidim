import { Component, OnInit, Output, Input } from '@angular/core';
import { Task } from '../../classes/task';

@Component({
  selector: 'app-avrech-diary',
  templateUrl: './avrech-diary.component.html',
  styleUrls: ['./avrech-diary.component.css']
})
export class AvrechDiaryComponent implements OnInit {

  constructor() { }
  @Output()
  flag: boolean = false;

  @Output()
  @Input()
  ttask: Task;

  ngOnInit() { 
    this.ttask=new Task();
  }

  // protected currentComponent: any;

  // onRouterOutletActivate(event) {
  //   debugger;
  //   this.currentComponent = event;
  // }
  addTask() {
    this.flag=true;
   // this.ttask = new Task()
  }
  saveTask() {
    debugger;
    alert("type: "+this.ttask.iTaskType);
    alert("dtTaskdate: "+this.ttask.dtTaskdate);
    alert("tTaskTime: "+this.ttask.tTaskTime);
    //שמירה
    this.ttask = null;
    //this.currentComponent.saveTask();
  }
  close(){
   // this.ttask = null;
    this.flag=false
  }
}
