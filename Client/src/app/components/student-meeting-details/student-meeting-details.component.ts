import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppProxy } from '../../services/app.proxy';
import { Meeting } from '../../classes/meeting';
import { SysTableRow } from '../../classes/SysTableRow';

@Component({
  selector: 'app-student-meeting-details',
  templateUrl: './student-meeting-details.component.html',
  styleUrls: ['./student-meeting-details.component.css']
})
export class StudentMeetingDetailsComponent implements OnInit {
  private sub: any;
  @Output() Meeting = new EventEmitter(); 

  @Output()
  @Input()
  protected meeting: Meeting;

  @Output()
  @Input()
  protected sysTableRowList:SysTableRow[];

  close(){
     this.Meeting.emit(null);
  }

  save() {
    this.meeting.dtMeetingDate = new Date(this.meeting.dtMeetingDate);
    // this.meeting.nvMeetingType
    //פגישה חדשה
    if (this.meeting.iMeetingId == null) {
      this.meeting.iPersonId=1;
      }
      this.appProxi.post("SetMeeting", { meeting: this.meeting, iUserId: 1 }).then(
        data => {
          alert("good");
          this.Meeting.emit(null);
          // debugger;
        },
      );
    
      }

  constructor(private route: ActivatedRoute, private appProxi: AppProxy) { }
  ngOnInit() {
   
  }
  

}
