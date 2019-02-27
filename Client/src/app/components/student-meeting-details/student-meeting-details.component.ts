import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ViewChild, Inject, forwardRef } from '@angular/core';
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
import { AppComponent } from '../app/app.component';
import * as moment from 'moment';
import { Avrech } from '../../classes/avrech';
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
  public meeting: Meeting;

  @Output()
  @Input()
  sysTableRowList: SysTableRow[];
  public avrechByStuden:Array<Avrech>=new Array<Avrech>();
  addTask:string;
  minutes: string;
  hours: string;
  taskSelect: boolean;
  
  @ViewChild('task') TaskComponent: TaskComponent;
  sub: any;
  iPersonId: number;
  currentMeeting: Meeting;
  constructor(private route: ActivatedRoute, private appProxi: AppProxy, private globalService: GlobalService
    , @Inject(forwardRef(() => AppComponent)) private _parent: AppComponent) { }

  ngOnInit() {
    
    // this.avrechByStuden
    this.addTask="הוספת";
    this.taskSelect = false;

    this.sub = this.route.parent.params.subscribe(params => {
      this.iPersonId = +params['iPersonId']; // (+) converts string 'id' to a number
      this.appProxi.post("GetAllAvrechimByStudent", { iPersonId:this.iPersonId }).then(
        data => {
          this.avrechByStuden = data; 
          // this.a=this.avrechByStuden;
          this.currentMeeting.iAvrechId=this.avrechByStuden[1].iPersonId;
          // this.currentMeeting.avrechName=this.avrechByStuden[1]
        },
      );
    });
    if(this.meeting.iMeetingId==null)
    {
      this.meeting.iMeetingType=this.sysTableRowList[0].iSysTableRowId
    }
    
    this.currentMeeting = new Meeting();
    this.currentMeeting = Object.assign({}, this.meeting);
    this.currentMeeting['dtDate'] =new Date((this.currentMeeting.dtMeetingDate));
    this.currentMeeting['dtHour'] =moment(this.currentMeeting.dtMeetingDate).format('HH:mm');
    // this.currentMeeting['iAvrechId']=this.currentMeeting.iAvrechId;
   
  }
  close() {
    this.Close.emit(null);
  }
text:string;
  save() {
    // this.meeting.dtMeetingDate = new Date(this.meeting.dtMeetingDate);
    // this.meeting.nvMeetingType
    //פגישה חדשה

    this.currentMeeting.dtMeetingDate = new Date(this.currentMeeting['dtDate'] + ' ' + this.currentMeeting['dtHour']);

    if (this.currentMeeting.iMeetingId == null)
      this.currentMeeting.iPersonId = this.iPersonId;
      // this.currentMeeting.avrechName=;
    this.appProxi.post("SetMeeting", { meeting: this.currentMeeting, iUserId: this.globalService.getUser()['iUserId'] }).then(
      data => {
        if (data != 0) {
          if (this.currentMeeting.iMeetingId == null) {
            this.currentMeeting.iMeetingId = data;
            this.text= this.avrechByStuden.find(a=>a.iPersonId==this.currentMeeting.iAvrechId).nvFirstName+' '+this.avrechByStuden.find(a=>a.iPersonId==this.currentMeeting.iAvrechId).nvLastName
            this.currentMeeting.avrechName= this.text;
            this.NewMeeting.emit(this.currentMeeting);
          }
          else
            this.UpdateMeeting.emit(this.currentMeeting);

          // alert("השמירה בוצעה בהצלחה");
          this._parent.openMessagePopup('השמירה בוצעה בהצלחה!');
          // this.currentMeeting.iAvrechId=
          this.Close.emit(null);
        }
        else
          //alert("השמירה נכשלה");
          this._parent.openMessagePopup('השמירה נכשלה!');

      },
    );
  }
 
  change()
  {
    if(this.addTask=="הוספת")
    this.addTask="הסר";
    else
    this.addTask="הוספת";
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
