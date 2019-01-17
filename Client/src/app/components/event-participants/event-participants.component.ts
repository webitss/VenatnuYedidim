import { Component, OnInit, Injectable, forwardRef, Inject } from '@angular/core';
import { AppProxy } from '../../services/app.proxy';
import { Participants } from '../../classes/participants';
import { ActivatedRoute } from '@angular/router';
import { SysTableRow } from '../../classes/SysTableRow';
import { Person } from '../../classes/person';
import { GlobalService } from '../../services/global.service';
import { SysTableService } from '../../services/sys-table.service';
import { VyTableColumn } from '../../templates/vy-table/vy-table.classes';
import { NgIf } from '@angular/common';
import { AppComponent } from '../app/app.component';

@Component({
  selector: 'app-event-participants',
  templateUrl: './event-participants.component.html',
  styleUrls: ['./event-participants.component.css']
})
export class EventParticipantsComponent implements OnInit {


  participantList: Person[] = [];
  protected iEventId: number;
  private sub: any;
  protected participant: Array<any> = new Array<any>();
  public sysTableRowList: SysTableRow[];
  protected iPerson: number;
  public flag: boolean;
  protected iLastModifyUserId: number;
  protected s: any;
  protected personsList: string[];
  // protected listToSelect: person[];
  listToSelect: Array<any>;
  allPersons: Array<any>;
  title: string = "רשימת כולם";
  inputTitle: string = "בחר משתתפים";
  flagDelete = false;
  message = 'האם אתה בטוח שברצונך למחוק משתתף זה?';
  header = 'מחיקת משתתף';
  iPersonId: number;
  constructor(@Inject(forwardRef(() => AppComponent)) private _parent: AppComponent, private appProxy: AppProxy, private router: ActivatedRoute, private sysTableService: SysTableService, private globalService: GlobalService) { }
  cancel(event) {
    this.flag = false;
  }
  public lstColumns = [
    new VyTableColumn('מחיקה', 'delete', 'html', true, false),
    new VyTableColumn('שם פרטי', 'nvFirstName'),
    new VyTableColumn('שם משפחה', 'nvLastName'),
    new VyTableColumn('טלפון', 'nvPhone'),
    new VyTableColumn('נייד', 'nvMobile'),
    new VyTableColumn('מייל', 'nvEmail'),
    new VyTableColumn('סוג משתמש', 'nvParticipantType'),
    new VyTableColumn('סטטוס הגעה', 'iArriveStatusType', 'html', true, false)
  ];
  public lstDataRows = [];

  addParticipants() {
    this.listToSelect = [];
    this.appProxy.post("GetPersonList").then(
      data => {
        this.allPersons = data;
        this.flag = true
        this.allPersons.forEach(
          person => {
            if (this.participantList.find(p => p.iPersonId == person.iPersonId) == null) {
              this.listToSelect.push({ value: person.nvFirstName + ' ' + person.lstObject['nvParticipantType'], iPersonId: person.iPersonId });
              this.iPersonId = person.iPersonId;
            }
          }
        );

      }
    );


  }

  //  להוסיף את המשתתפים שנבחרו

  event: any;
  save() {

    this.listToSelect.forEach(item => {
      if (item['bMultySelectChecked'] == true)
        this.appProxy.post("SetEventParticipant", {
          isNew: true, iStatusType: 34, iPersonId: item.iPersonId, iEventId: this.iEventId,
          iUserId: this.globalService.getUser().iPersonId
        })
          .then(data => {
            if (data == true)
              this._parent.openMessagePopup("השמירה התבצעה בהצלחה!");
            else
              this._parent.openMessagePopup("השמירה נכשלה");

          });


    });

  }
  ngOnInit() {

    this.listToSelect = new Array<any>();

    this.appProxy.post('GetPersonList', { iPersonId: 0 }).then(
      data => {


        this.allPersons = data
        //  this.allPersons.forEach(
        //   st => {
        //      st['delete'] = '<button class="btn delete" >מחק</button>'; 
        //     });
        this.allPersons.forEach(
          person => {
            this.listToSelect.push({ value: person.nvFirstName + ' ' + person.lstObject['nvParticipantType'] });
          }
        );

      }
      , err => alert(err));

    this.sub = this.router.parent.params.subscribe(params => {
      this.iEventId = +params['iEventId'];
      this.appProxy.post("GetParticipantsList", { iEventId: this.iEventId }).then(res => {
        if (res.length > 0) {
          this.participantList = res;
          this.sysTableService.getValues(SysTableService.dataTables.arrivalType.iSysTableId).then(data => {
            this.sysTableRowList = data;
          });
          res.forEach(p => {
            // this.participant.forEach(p => {
            this.lstDataRows.push({
              delete: p.delete,
              iEventId: p.iEventId,
              nvFirstName: p.nvFirstName,
              nvLastName: p.nvLastName,
              nvPhone: p.nvPhone,
              nvMobile: p.nvMobile,
              nvEmail: p.nvEmail,
              nvParticipantType: p.lstObject.nvParticipantType,
              // iArriveStatusType: p.iArriveStatusType,
              iArriveStatusType: '<select> <option>j,k</option><option>ughjk</option></select>'
              // iArriveStatusType:'<button>fgd</button>'
              // iArriveStatusType: this.sysTableRowList.filter(s => s.iSysTableRowId ==parseInt (p.lstObject.iArrivalStatusType))[0].nvValue;
            });
          });
          // });
          this.lstDataRows.forEach(p => {
            p['delete'] = '<div class="delete"></div>';
          });
        }

      });
    });
  }
}
  




