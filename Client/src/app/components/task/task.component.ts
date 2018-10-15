import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from "../../classes/task"
import { SysTableService } from '../../services/sys-table.service';
import { AppProxy } from '../../services/app.proxy';
import { GlobalService } from '../../services/global.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Student } from '../../classes/student';
import { AvrechDiaryComponent } from "../../components/avrech-diary/avrech-diary.component"
import { CalendarComponent } from '../calendar/calendar.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  @Input()
  @Output()
  taskTypeList: Array<any>;
  @Output()
  @Input()
  task: Task;
  currentTask: Task = new Task();
  selectType: string;
  type: Task;
  iuserid: number;


  constructor(private appProxy: AppProxy, private sysTableService: SysTableService, private globalService: GlobalService, private router: Router, private route: ActivatedRoute) { }

  minutes: string;
  hours: string;

  personId: number;
  student: Student;
  isNew: boolean = false;
  ngOnInit() {
    this.currentTask = Object.assign({}, this.task);
      if (this.task == undefined) {
        this.task = new Task();
        this.isNew = true;
      }
    this.sysTableService.getValues(SysTableService.dataTables.Task.iSysTableId).then(data => {
      this.taskTypeList = data;
      

      this.currentTask['dtDate'] = this.task.dtTaskdatetime;//.getTime();

      // this.meeting['dtHour'] = new Date((this.meeting.dtMeetingDate).getHours()) + ':'+new Date((this.meeting.dtMeetingDate).getMinutes());
      if ((this.task.dtTaskdatetime).getMinutes() < 10)
        this.minutes = '0' + (this.task.dtTaskdatetime).getMinutes().toString();
      else
        this.minutes = (this.task.dtTaskdatetime).getMinutes().toString();

      if ((this.task.dtTaskdatetime).getHours() < 10)
        this.hours = '0' + (this.task.dtTaskdatetime).getHours().toString();
      else
        this.hours = (this.task.dtTaskdatetime).getHours().toString();

      this.currentTask['dtHour'] = this.hours + ':' + this.minutes;
    });

    this.route.parent.params.subscribe(params => {
      this.personId = +params['iPersonId'];
    });
    debugger
    if (this.isNew == true) {
      if (this.router.url == "/avrechim/avrech/" + this.personId + "/avrech-diary")//אברכים->יומן
      {
        this.task.nvComments = " עם התלמיד: "
        this.task.iPersonId = this.personId;//מי שלחצו עליו
      }
      else {
        // alert(this.personId);
        this.appProxy.post('GetStudentById', { iUserId: this.personId }).then(data => {
          if (data) {
            this.student = data;
            if (this.router.url == "/students/student/" + this.personId + "/student-meetings")//תלמידים ->פגישות
            {
              this.task.nvComments = " פגישה עם התלמיד: " + this.student.nvFirstName + " " + this.student.nvLastName;//מי שלחצו עליו
              this.task.iPersonId = this.globalService.getUser().iPersonId;//משתמש

            }
            else
              if (this.router.url == "/students/student/" + this.personId + "/student-conversations")//תלמידים ->שיחות
              {
                this.task.nvComments = " שיחה עם התלמיד: " + this.student.nvFirstName + " " + this.student.nvLastName;//מי שלחצו עליו
                this.task.iPersonId = this.globalService.getUser().iPersonId;//משתמש
              }

          }
          else
            alert("error!");

        });
      }
    }
  
  }
  @Output() close:EventEmitter<any>= new EventEmitter<any>();
// addOrEdit:boolean=false;
  saveTask() {
    debugger
    this.task.dtTaskdatetime = new Date(this.currentTask['dtDate'] + ' ' + this.currentTask['dtHour']);
    //    if (this.currentTask.iTaskId == 0)
    this.appProxy.post('SetTask', { task: this.task, iUserId: this.globalService.getUser()['iUserId'] }).then(data => {
      if (data) {
      
      
        alert("המשימה נוספה בהצלחה!");
        this.close.emit();
        //close
      }
    },err=>{
    });
    
  }

}


