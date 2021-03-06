import { Component, OnInit, ViewChild, forwardRef, Inject } from '@angular/core';
import { Meeting } from '../../classes/meeting';
import { AppProxy } from '../../services/app.proxy';
import { StudentMeetingDetailsComponent } from '../student-meeting-details/student-meeting-details.component';
import { SysTableService } from '../../services/sys-table.service';
import { SysTableRow } from '../../classes/SysTableRow';
import { ActivatedRoute } from '@angular/router';
import { element } from 'protractor';
import { VyTableComponent } from '../../templates/vy-table/vy-table.component';
import { GlobalService } from '../../services/global.service';
import { AppComponent } from '../app/app.component';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Student } from '../../classes/student';



@Component({
  selector: 'app-student-meetings',
  templateUrl: './student-meetings.component.html',
  styleUrls: ['./student-meetings.component.css']
})
export class StudentMeetingsComponent implements OnInit {
  iMeetingId: number;
  private sub: any;
  private alert: any;
  iPersonId: number;
  public meetingList: Array<Meeting>;
  id: number;
  meeting: Meeting;
  flag: number;
  sysTableRowList: SysTableRow[];
  flagDelete = false;
  header = 'מחיקת פגישה';
  message = '';
  deleMeeting: Meeting;
  student:Student;
@ViewChild('StudentMeetingDetailsComponent') StudentMeetingDetailsComponent:StudentMeetingDetailsComponent;
  constructor(private appProxy: AppProxy, private sysTableService: SysTableService, private route: ActivatedRoute, private globalService: GlobalService,
    @Inject(forwardRef(() => AppComponent)) private _parent: AppComponent) { }


  public lstColumns = [
  {title: 'עריכה',name: 'edit',bClickCell: true,type: 'html'},
  {title: 'מחיקה',name: 'delete',bClickCell: true,type: 'html'},
  {title: 'סוג פגישה',name: 'nvMeetingType',},
  {title: 'שם אברך',name: 'avrechName',},
  {title: 'תאריך',name: 'nvDate',},
  {title: 'שעה',name: 'nvHour'},
  {title: 'סיכום',name: 'nvSummary',}
  ]

  editMeeting(meeting: Meeting) {
     
    this.meeting = meeting;
    this.flag = 1;
  }

  deleteMeeting(meeting: Meeting) {
    this.appProxy.post('DeleteMeeting', { iMeetingId: meeting.iMeetingId, iUserId: this.globalService.getUser()['iUserId'] }).then(data => {
      this._parent.openMessagePopup('המחיקה בוצעה בהצלחה!');
      this.meetingList.splice(this.meetingList.indexOf(meeting), 1);
      this.cc.refreshTable(this.meetingList);
    });
  }


  delMeeting(m: Meeting) {
    this.deleMeeting = m;
    this.message = 'האם אתה בטוח שברצונך למחוק פגישה זו?';
    this.flagDelete = true;
    //this.alert = confirm("האם אתה בטוח שברצונך למחוק פגישה זו?");
    //if (this.alert == true) {
    //   this.appProxy.post('DeleteMeeting', { iMeetingId: meeting.iMeetingId, iUserId: this.globalService.getUser()['iUserId'] }).then(data => {
    //     this.meetingList.splice(this.meetingList.indexOf(meeting), 1);
    //     this.cc.refreshTable(this.meetingList);
    //  // });
    // }
  }

  m: Meeting;

  @ViewChild(VyTableComponent) cc: VyTableComponent;

  click(e) {
    if (e.columnClickName == 'edit')
      this.editMeeting(e);
    else
      this.delMeeting(e);

  }

  updateMeeting(meeting: Meeting) {
    let l = this.meetingList.indexOf(this.meetingList.find(m1 => m1.iMeetingId == meeting.iMeetingId))
    this.changeTable(meeting);
    this.meetingList[l] = this.meet;
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
  meet:Meeting;
  newMeeting(newMeeting: Meeting) {
    this.changeTable(newMeeting);
    this.meetingList.push(this.meet);
    this.cc.refreshTable(this.meetingList);

    
  }
  // avrechName:any;
  changeTable(m: Meeting) {
    this.StudentMeetingDetailsComponent=new StudentMeetingDetailsComponent(this.route,this.appProxy,this.globalService,this._parent);
    m['nvDate'] = m.dtMeetingDate.toLocaleDateString();
    m['nvHour'] = m.dtMeetingDate.toLocaleTimeString();
    m['edit'] = '<div class="edit"></div>';
    m['delete'] = '<div class="delete"></div>';
    m['nvMeetingType'] = this.sysTableRowList.filter(s => s.iSysTableRowId == m.iMeetingType)?this.sysTableRowList.filter(s => s.iSysTableRowId == m.iMeetingType)[0]?this.sysTableRowList.filter(s => s.iSysTableRowId == m.iMeetingType)[0].nvValue:'':'';
    m['iAvrechId']=m.iAvrechId;
    m['avrechName']=m.avrechName;
    //  m['avrechName']=this.StudentMeetingDetailsComponent.avrechByStuden.find(a=>a.iPersonId==m.iAvrechId).nvLastName;
    this.meet = m;
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
         
      }
    );
  }

  ngOnInit() {
    this.sub = this.route.parent.params.subscribe(params => {
      this.iPersonId = +params['iPersonId']; // (+) converts string 'id' to a number
    });
    this.appProxy.post("GetStudentById",{iStudentId:this.iPersonId}).then(dd=>{
      this.student=dd;      
      this.globalService.student=this.student;
debugger;
    })
    this.GetMeetingsByStudentId(this.iPersonId);
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}

