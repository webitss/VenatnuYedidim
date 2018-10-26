import { Component, OnInit, ViewChild, Inject, forwardRef } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { AppProxy } from '../../services/app.proxy';
import { SysTableService } from '../../services/sys-table.service';
import { SysTableRow } from '../../classes/SysTableRow';
import { VyTableColumn } from '../../templates/vy-table/vy-table.classes';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../classes/user';
import { VyTableComponent } from '../../templates/vy-table/vy-table.component';
import { Event1 } from '../../classes/event';
import { AppComponent } from '../app/app.component';

@Component({
  selector: 'app-student-events',
  templateUrl: './student-events.component.html',
  styleUrls: ['./student-events.component.css']
})
export class StudentEventsComponent implements OnInit {

  flagDelete=false;
  message='';
  header='מחיקת אירוע לתלמיד';
  deleteEvent:Event1;

  lstValues: SysTableRow[];
  lstDataRows = [];
  private iPersonId: number;
  @ViewChild(VyTableComponent) vyTableComponent: VyTableComponent;


  constructor(private globalService: GlobalService, private appProxy: AppProxy, private route: ActivatedRoute, private sysTableService: SysTableService, 
    private router: Router,@Inject(forwardRef(() => AppComponent)) private _parent: AppComponent) { }

  ngOnInit() {
    // this.iPersonId = this.globalService.getUser()['iUserId'];
    this.route.parent.params.subscribe(params => {
      this.iPersonId = params["iPersonId"]
    });
    this.appProxy.post("GetEventsByStudent", { iPersonId: this.iPersonId }).then(data => {
      this.lstDataRows = data;
      this.lstDataRows.forEach(e => {
        e["dtEventDate"] = e.dtEventDate.toLocaleDateString();
        e["edit"] = "<div class='edit'></div>";
        e["delete"] = "<div class='delete'></div>";
      });
      this.sysTableService.getValues(SysTableService.dataTables.arrivalType.iSysTableId).then(data => {
        this.lstDataRows.forEach(event => {
          this.lstValues = data;
          event["iArrivalStatusType"] = data.filter(s => s.iSysTableRowId == event["iArrivalStatusType"])[0].nvValue;
        });
      });
    }).catch(err => {
      alert(err);
    });
  }

  public lstColumns = [
    new VyTableColumn('עריכה', 'edit', 'html', true, false),
    new VyTableColumn('מחיקה', 'delete', 'html', true, false),
    new VyTableColumn('שם אירוע', 'nvName'),
    new VyTableColumn('תאריך', 'dtEventDate'),
    new VyTableColumn('מקום', 'nvPlace'),
    new VyTableColumn('סטטוס', 'iArrivalStatusType'),
  ];

  click(e) {
    if (e.columnClickName == 'edit')
      this.edit(e);
    else
      this.delEvent(e);

  }

  edit(e: Event1) {
    this.router.navigate(['./student-events-details/',e.iEventId]);
  }

  private alert: any;
  private flag: boolean = false;

  delEvent(e:Event1) {
    this.message='האם אתה בטוח שברצונך למחוק את '+e.nvName+'?';
    this.deleteEvent=e;
    this.flagDelete=true;
  }

  delete() {
   // this.alert = confirm("האם אתה בטוח שברצונך למחוק ארוע זה?");
    // if (this.alert == true) {
    //   // this.appProxy.post('לעשות פרוצדורה', { iPersonId: u.iPersonId, iUserId: this.globalService.getUser().iPersonId }).then(data => { }).catch(err => {
    //   //   alert(err);
    //   });

    //כשהמחיקה מתבצעת בהצלחה שימי את השורה הבאה-
    //this._parent.openMessagePopup('המחיקה בוצעה בהצלחה!');
    this.lstDataRows.splice(this.lstDataRows.indexOf(this.deleteEvent), 1);
    this.vyTableComponent.refreshTable(this.lstDataRows);
  }
  from: number = 0;
  eventFlag: boolean = false;
  newEvent(from) {
    this.eventFlag = true;
    this.from = from;
  }
  close(){
    this.eventFlag = false;
  }
}

