import { Component, OnInit } from '@angular/core';
import { Meeting } from '../../classes/meeting';
import { AppProxy } from '../../services/app.proxy';
import { StudentMeetingDetailsComponent } from '../student-meeting-details/student-meeting-details.component';
import { SysTableService } from '../../services/sys-table.service';
import { SysTableRow } from '../../classes/SysTableRow';
import { ActivatedRoute } from '@angular/router';
import { element } from 'protractor';



@Component({
  selector: 'app-student-meetings',
  templateUrl: './student-meetings.component.html',
  styleUrls: ['./student-meetings.component.css']
})
export class StudentMeetingsComponent implements OnInit {
  iMeetingId: number;
  private sub: any;
  iPersonId:number;
  protected meetingList: Array<Meeting>;
  id: number;
  meeting: Meeting;
  flag: number;
  sysTableRowList: SysTableRow[];

  constructor(private appProxy: AppProxy, private sysTableService: SysTableService, private route: ActivatedRoute) { }


  public lstColumns = [{
    title: 'עריכה',
    name: 'edit',
    bClickCell: true,
    type: 'html'

  },
  {
    title: 'סוג פגישה',
    name: 'nvMeetingType',


  },
  {
    title: 'תאריך',
    name: 'nvDate',
  },
  {
    title: 'שעה',
    name: 'nvHour'
  },
  {
    title: 'סיכום',
    name: 'nvSummary',
  }]

  editMeeting(meeting: Meeting) {

    this.meeting = meeting;

    this.flag = 1;
  }
  m:Meeting;
updateMeeting(meeting:Meeting){
 this.meetingList.splice( this.meetingList.indexOf(this.meetingList.find(m => m.iMeetingId == meeting.iMeetingId),0),1);
//  this.meetingList.filter(m => m.iMeetingId == meeting.iMeetingId)[0]= meeting;
// this.meetingList.forEach(element => {
//   if(element.iMeetingId == meeting.iMeetingId)
//   element = meeting;
// })
 
this.meetingList.push(meeting);
}
  addMeeting() {
    this.meeting = new Meeting();
    this.meeting.dtMeetingDate = new Date();
  }
  close() {
    this.meeting = null;
  }
  addNewMeeting(meeting: Meeting) {
    this.meetingList.push(meeting);
  }
  newMeeting(newMeeting:Meeting){
    this.changeTable(newMeeting);
    this.meetingList.push(newMeeting);

    //  this.GetMeetingsByStudentId(this.iPersonId);
  }

  changeTable(m:Meeting){
    
    m['nvDate'] = m.dtMeetingDate.toLocaleDateString();
    m['nvHour'] = m.dtMeetingDate.toLocaleTimeString();
    m['edit'] = '<div class="edit"></div>';
    m['nvMeetingType'] = this.sysTableRowList.filter(s => s.iSysTableRowId == m.iMeetingType)[0].nvValue;
  }
  GetMeetingsByStudentId(id: number) {
    this.appProxy.post("GetMeetingsByStudentId", { iPersonId: id }).then(
      data => {
        //alert("good");
        this.meetingList = data;
        this.sysTableService.getValues(SysTableService.dataTables.meetingType.iSysTableId).then(data => {
          this.sysTableRowList = data;
          this.meetingList.forEach(m => {
            this.changeTable(m);
          });


        });
        debugger;
      }
    );
  }

  ngOnInit() {
    this.sub = this.route.parent.params.subscribe(params => {
      this.iPersonId = +params['iPersonId']; // (+) converts string 'id' to a number
   });
 
this.GetMeetingsByStudentId(this.iPersonId);
  }
 ngOnDestroy() {
    this.sub.unsubscribe();
  }
}

