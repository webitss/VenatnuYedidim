import { Component, OnInit, ViewChild } from '@angular/core';
import { Meeting } from '../../classes/meeting';
import { AppProxy } from '../../services/app.proxy';
import { StudentMeetingDetailsComponent } from '../student-meeting-details/student-meeting-details.component';
import { SysTableService } from '../../services/sys-table.service';
import { SysTableRow } from '../../classes/SysTableRow';
import { ActivatedRoute } from '@angular/router';
import { element } from 'protractor';
import { VyTableComponent } from '../../templates/vy-table/vy-table.component';
import { GlobalService } from '../../services/global.service';



@Component({
  selector: 'app-student-meetings',
  templateUrl: './student-meetings.component.html',
  styleUrls: ['./student-meetings.component.css']
})
export class StudentMeetingsComponent implements OnInit {
  iMeetingId: number;
  private sub: any;
  private alert: any;
  iPersonId:number;
  public meetingList: Array<Meeting>;
  id: number;
  meeting: Meeting;
  flag: number;
  sysTableRowList: SysTableRow[];

  constructor(private appProxy: AppProxy, private sysTableService: SysTableService, private route: ActivatedRoute, private globalService: GlobalService) { }


  public lstColumns = [{
    name: 'edit',
    bClickCell: true,
    type: 'html'

  },
  {
    name: 'delete',
    bClickCell: true,
    type:'html'
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
  }
  ]

  editMeeting(meeting: Meeting) {
    debugger;
    this.meeting = meeting;
    this.flag = 1;
  }

  deleteMeeting(meeting: Meeting){
      this.alert = confirm("האם אתה בטוח שברצונך למחוק פגישה זו?");
      if (this.alert == true){
        this.appProxy.post('DeleteMeeting', { iMeetingId: meeting.iMeetingId ,iUserId: this.globalService.getUser()['iUserId']}).then(data => {
          this.meetingList.splice(this.meetingList.indexOf(meeting), 1);
          this.cc.refreshTable(this.meetingList);
        });
      }
   
  }

  m:Meeting;

  @ViewChild(VyTableComponent) cc:VyTableComponent;

  click(e) {
    if (e.columnClickName == 'edit')
      this.editMeeting(e);
    else
      this.deleteMeeting(e);

  }

updateMeeting(meeting:Meeting){
  let l= this.meetingList.indexOf(this.meetingList.find(m1 => m1.iMeetingId == meeting.iMeetingId))
  this.meetingList[l]=meeting;
 this.cc.refreshTable(this.meetingList)
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
  }

  changeTable(m:Meeting){
    
    m['nvDate'] = m.dtMeetingDate.toLocaleDateString();
    m['nvHour'] = m.dtMeetingDate.toLocaleTimeString();
    m['edit'] = '<div class="edit"></div>';
    m['delete'] = '<div class="delete"></div>';
    m['nvMeetingType'] = this.sysTableRowList.filter(s => s.iSysTableRowId == m.iMeetingType)[0].nvValue;
  }
  GetMeetingsByStudentId(id: number) {
    this.appProxy.post("GetMeetingsByStudentId", { iPersonId: id }).then(
      data => {
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

