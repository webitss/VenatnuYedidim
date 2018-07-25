import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppProxy } from '../../services/app.proxy';
import { Meeting } from '../../classes/meeting';

@Component({
  selector: 'app-student-meeting-details',
  templateUrl: './student-meeting-details.component.html',
  styleUrls: ['./student-meeting-details.component.css']
})
export class StudentMeetingDetailsComponent implements OnInit {
  private sub: any;
  @Output() Meeting = new EventEmitter();  
  // @Input() 
  // protected meetingId:number;

  @Output()
  @Input()
  protected meeting: Meeting;

  close(){
     this.Meeting.emit(null);
  }

  save() {
    this.meeting.dtMeetingDate = new Date(this.meeting.dtMeetingDate);
    //פגישה חדשה
    if (this.meeting.iMeetingId == null) {
      this.meeting.iPersonId=1;
      this.appProxi.post("AddMeeting", { meeting: this.meeting, iUserId: 1 }).then(
        data => {
          alert("good");
          this.Meeting.emit(null);
          // debugger;
        },
        err => {
          alert("not good");
        }
      );
    }
    else
    this.appProxi.post("UpdateMeeting", { meeting: this.meeting, iUserId: 1 }).then(
      data => {
        alert("good");
        debugger;
      },
      err => {
        alert("not good");
      }
    );
  }

  constructor(private route: ActivatedRoute, private appProxi: AppProxy) { }
  // subscription:Subscription;
  ngOnInit() {
    if (this.meeting == null)
      this.meeting = new Meeting();
    //  this.sub=this.route.params.subscribe(params=>{
    //    this.meetingId=+params['iMeetingId'];
    //  });
    debugger;

  }
  // ngOnDestroy() {
  //   this.sub.unsubscribe();
  //   }



}
