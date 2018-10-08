import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from "../../classes/task"
import { SysTableService } from '../../services/sys-table.service';
import { AppProxy } from '../../services/app.proxy';
import { GlobalService } from '../../services/global.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Student } from '../../classes/student';
import { AvrechDiaryComponent } from "../../components/avrech-diary/avrech-diary.component"

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

  ngOnInit() {


    // this.appProxy.post("GetTask", { iPersonId: 1 }).then(
    //   data => {
    //     //alert("good");
    //     this.taskList = data;
    this.sysTableService.getValues(SysTableService.dataTables.Task.iSysTableId).then(data => {
      this.taskTypeList = data;
      //this.task.iTaskType=this.type['iSysTableRowId'];


      // this.sysTableRowList =  data;
      //   this.meetingList.forEach(m => {
      //     m['nvDate'] = m.dtMeetingDate.toLocaleDateString();
      //     m['nvHour'] = m.dtMeetingDate.toLocaleTimeString();
      //     m['edit'] ='<div class="edit"></div>';
      //     m['nvMeetingType'] = this.sysTableRowList.filter(s=> s.iSysTableRowId == m.iMeetingType)[0].nvValue;
      // });


      this.currentTask = Object.assign({}, this.task);
      this.currentTask['dtDate'] = new Date((this.currentTask.dtTaskdatetime).getTime());

      // this.meeting['dtHour'] = new Date((this.meeting.dtMeetingDate).getHours()) + ':'+new Date((this.meeting.dtMeetingDate).getMinutes());
      if ((this.task.dtTaskdatetime).getMinutes() < 10)
        this.minutes = '0' + (this.currentTask.dtTaskdatetime).getMinutes().toString();
      else
        this.minutes = (this.currentTask.dtTaskdatetime).getMinutes().toString();

      if ((this.currentTask.dtTaskdatetime).getHours() < 10)
        this.hours = '0' + (this.currentTask.dtTaskdatetime).getHours().toString();
      else
        this.hours = (this.currentTask.dtTaskdatetime).getHours().toString();


      this.currentTask['dtHour'] = this.hours + ':' + this.minutes;
      // }
    });
    this.task = new Task();

    this.route.parent.params.subscribe(params => {
      this.personId = +params['iPersonId'];
    });

    if (this.router.url == "/avrechim/avrech/" + this.personId + "/avrech-diary")//אברכים->יומן
    {
      this.task.nvComments = " עם התלמיד: "
      this.task.iPersonId = this.personId;//מי שלחצו עליו
    }
    else {
      alert(this.personId);
      this.appProxy.post('GetStudentById', { iUserId: this.personId }).then(data => {
        if (data) {
          // alert("personid"+this.personId);
          // alert("jjjה!");
          this.student = data;
          // alert(this.student.nvLastName);

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
      })
    }
  }
  // );

  saveTask() {
    this.task.dtTaskdatetime = new Date(this.currentTask['dtDate'] + ' ' + this.currentTask['dtHour']);
    //    if (this.currentTask.iTaskId == 0)
    this.appProxy.post('SetTask', { task: this.task, iUserId: this.globalService.getUser()['iUserId'] }).then(data => {
      if (data) {
        alert("המשימה נוספה בהצלחה!");
        //close
        // this.avrechDiaryComponent.close();
      }
    })
  }

}


