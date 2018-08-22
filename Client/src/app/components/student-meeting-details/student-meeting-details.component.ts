import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppProxy } from '../../services/app.proxy';
import { Meeting } from '../../classes/meeting';
import { SysTableRow } from '../../classes/SysTableRow';
import { timeout } from 'q';
import { TIMEOUT } from 'dns';
import { Timeouts } from 'selenium-webdriver';
import { NguiDatetime } from '@ngui/datetime-picker';

@Component({
  selector: 'app-student-meeting-details',
  templateUrl: './student-meeting-details.component.html',
  styleUrls: ['./student-meeting-details.component.css']
})
export class StudentMeetingDetailsComponent implements OnInit {
  private sub: any;
  @Output() Meeting = new EventEmitter();
  @Output() NewMeeting = new EventEmitter<Meeting>();

  @Output()
  @Input()
  protected meeting: Meeting;

  @Output()
  @Input()
  protected sysTableRowList: SysTableRow[];

  minutes: string;
  hours: string;

  close() {
    this.Meeting.emit(null);
  }

  save() {
    // this.meeting.dtMeetingDate = new Date(this.meeting.dtMeetingDate);
    // this.meeting.nvMeetingType
    //פגישה חדשה
   
    this.meeting.dtMeetingDate = new Date(this.meeting['dtDate']+' '+this.meeting['dtHour']);

    this.appProxi.post("SetMeeting", { meeting: this.meeting, iUserId: 1 }).then(
      data => {
        if (this.meeting.iMeetingId == null) {
          this.meeting = data;
          this.NewMeeting.emit(this.meeting);
        }
        else{
          this.meeting['nvDate'] = this.meeting.dtMeetingDate.toLocaleDateString();
          this.meeting['nvHour'] = this.meeting.dtMeetingDate.toLocaleTimeString();
          this.meeting['edit'] = '<div class="edit"></div>';
          this.meeting['nvMeetingType'] = this.sysTableRowList.filter(s=> s.iSysTableRowId == this.meeting.iMeetingType)[0].nvValue;    
            }
        alert("good");
        this.Meeting.emit(null);
        // debugger;
      },
    );
  }

  constructor(private route: ActivatedRoute, private appProxi: AppProxy) { }
  ngOnInit() {

    this.meeting['dtDate'] = new Date((this.meeting.dtMeetingDate).getTime());

    // this.meeting['dtHour'] = new Date((this.meeting.dtMeetingDate).getHours()) + ':'+new Date((this.meeting.dtMeetingDate).getMinutes());
    if ((this.meeting.dtMeetingDate).getMinutes() < 10)
      this.minutes = '0' + (this.meeting.dtMeetingDate).getMinutes().toString();
    else
      this.minutes = (this.meeting.dtMeetingDate).getMinutes().toString();

    if ((this.meeting.dtMeetingDate).getHours() < 10)
      this.hours = '0' + (this.meeting.dtMeetingDate).getHours().toString();
    else
      this.hours = (this.meeting.dtMeetingDate).getHours().toString();


    this.meeting['dtHour'] = this.hours + ':' + this.minutes;

  }


}
