import { Component, OnInit } from '@angular/core';
import { Meeting } from '../../classes/meeting';
import { AppProxy } from '../../services/app.proxy';

@Component({
  selector: 'app-student-meetings',
  templateUrl: './student-meetings.component.html',
  styleUrls: ['./student-meetings.component.css']
})
export class StudentMeetingsComponent implements OnInit {

  constructor(private appProxy:AppProxy) { }
  meetingList:Meeting[];
  id:number;
  // meetingList:Meeting[]=new Meeting[6];
  ngOnInit() {
    this.appProxy.post("GetMeetingsByStudentId",{iPersonId:2}).then(
      data=>
      {
    this.meetingList=data;
    debugger;
    },
      err=>("err")
    );
  }

}
