import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppProxy } from '../../services/app.proxy';
import { Meeting } from '../../classes/meeting';
import { SysTableRow } from '../../classes/SysTableRow';
import { timeout } from 'q';
import { TIMEOUT } from 'dns';
import { Timeouts } from 'selenium-webdriver';
import { TaskComponent } from '../task/task.component';
import { NguiDatetime } from '@ngui/datetime-picker';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-student-meeting-details',
  templateUrl: './student-meeting-details.component.html',
  styleUrls: ['./student-meeting-details.component.css']
})
export class StudentMeetingDetailsComponent implements OnInit {
  @Output() Close = new EventEmitter();
  @Output() NewMeeting = new EventEmitter<Meeting>();
  @Output() UpdateMeeting = new EventEmitter<Meeting>();

  @Output()
  @Input()
  protected meeting: Meeting;

  @Output()
  @Input()
  protected sysTableRowList: SysTableRow[];

  minutes: string;
  hours: string;

  @ViewChild('task') TaskComponent: TaskComponent;
  sub: any;
  iPersonId: number;

  close() {
    this.Close.emit(null);
  }

  save() {
    // this.meeting.dtMeetingDate = new Date(this.meeting.dtMeetingDate);
    // this.meeting.nvMeetingType
    //פגישה חדשה

    this.currentMeeting.dtMeetingDate = new Date(this.currentMeeting['dtDate'] + ' ' + this.currentMeeting['dtHour']);
    // this.currentMeeting['nvDate'] = this.currentMeeting['dtDate'].toLocaleDateString();
    // this.currentMeeting['nvHour'] = this.currentMeeting['dtHour'].toLocaleTimeString();

    if (this.currentMeeting.iMeetingId == null)
      this.currentMeeting.iPersonId = this.iPersonId;

    this.appProxi.post("SetMeeting", { meeting: this.currentMeeting, iUserId: this.globalService.getUser()['iUserId'] }).then(
      data => {
        if (data != 0) {
          if (this.currentMeeting.iMeetingId == null) {
            this.currentMeeting.iMeetingId = data;
            this.NewMeeting.emit(this.currentMeeting);
          }
          // this.meeting =  Object.assign({},this.currentMeeting);
          else
            this.UpdateMeeting.emit(this.currentMeeting);

          // if (this.meeting.iMeetingId == null) {          
          //   this.meeting = data;          
          //   this.NewMeeting.emit(this.meeting);
          // }
          // else{
          //   this.meeting['nvDate'] = this.meeting.dtMeetingDate.toLocaleDateString();
          //   this.meeting['nvHour'] = this.meeting.dtMeetingDate.toLocaleTimeString();
          //   this.meeting['edit'] = '<div class="edit"></div>';
          //   this.meeting['nvMeetingType'] = this.sysTableRowList.filter(s=> s.iSysTableRowId == this.meeting.iMeetingType)[0].nvValue;    
          //     }
          this.Close.emit(null);

          //  this.TaskComponent.saveTask();

        }
        else
          alert("failed");


        // debugger;
      },
    );
  }
  currentMeeting: Meeting;
  constructor(private route: ActivatedRoute, private appProxi: AppProxy, private globalService: GlobalService) { }

  ngOnInit() {


    this.sub = this.route.parent.params.subscribe(params => {
      this.iPersonId = +params['iPersonId']; // (+) converts string 'id' to a number
    });

    this.currentMeeting = new Meeting();
    this.currentMeeting = Object.assign({}, this.meeting);

    this.currentMeeting['dtDate'] = new Date((this.currentMeeting.dtMeetingDate).getTime());


    // this.meeting['dtHour'] = new Date((this.meeting.dtMeetingDate).getHours()) + ':'+new Date((this.meeting.dtMeetingDate).getMinutes());
    if ((this.meeting.dtMeetingDate).getMinutes() < 10)
      this.minutes = '0' + (this.currentMeeting.dtMeetingDate).getMinutes().toString();
    else
      this.minutes = (this.currentMeeting.dtMeetingDate).getMinutes().toString();

    if ((this.currentMeeting.dtMeetingDate).getHours() < 10)
      this.hours = '0' + (this.currentMeeting.dtMeetingDate).getHours().toString();
    else
      this.hours = (this.currentMeeting.dtMeetingDate).getHours().toString();


    this.currentMeeting['dtHour'] = this.hours + ':' + this.minutes;

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
