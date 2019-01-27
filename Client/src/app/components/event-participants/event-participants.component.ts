import { Component, OnInit, Injectable, forwardRef, Inject, ViewChild } from '@angular/core';
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
import { VyTableComponent } from '../../templates/vy-table/vy-table.component';

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
  @ViewChild(VyTableComponent) vyTableComponent: VyTableComponent;
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
  public Columns = [
    new VyTableColumn('בחר', 'checked', 'checkbox'),
    new VyTableColumn('שם פרטי', 'nvFirstName'),
    new VyTableColumn('סוג משתמש', 'nvParticipantType'),
   
  ];
  public lstDataRows = [];

  addParticipants() {
    this.listToSelect = [];
    this.appProxy.post("GetPersonList").then(
      data => {
        this.allPersons = data;
        this.flag = true
        this.listToSelect = this.allPersons.filter(per => (!this.participantList.find(p => p.iPersonId == per.iPersonId)));
        this.listToSelect.forEach(
          person => {
            person['value'] = person.nvFirstName + ' ' + person.lstObject['nvParticipantType'];
            person['nvParticipantType'] = person.lstObject['nvParticipantType'] ;

            //this.listToSelect.push({ value: person.nvFirstName + ' ' + person.lstObject['nvParticipantType'], iPersonId: person.iPersonId });
            //this.iPersonId = person.iPersonId;

          }
        );

      }
    );


  }

  //  להוסיף את המשתתפים שנבחרו

  event: any;
  save() {
    let sumSave = 0;
    let lstToSave = this.listToSelect.filter(f => f['checked']==true);
    let sumToSave = lstToSave.length;
    this.flag = false;
    lstToSave.forEach(item => {
      //if (item['bMultySelectChecked'] == true)
      this.appProxy.post("SetEventParticipant", {
        isNew: true, iStatusType: 34, iPersonId: item.iPersonId, iEventId: this.iEventId,
        iUserId: this.globalService.getUser().iPersonId
      })
        .then(data => {
          if (data == true) {
            sumSave++;

            if (sumSave == sumToSave) {
              this._parent.openMessagePopup("השמירה בוצעה בהצלחה!");
              // this.lstDataRows = this.lstDataRows.concat(lstToSave);
              // this.appProxy.post("GetParticipantsList", { iEventId: this.iEventId }).then(res => {
              //   if (res.length > 0) {
              //     this.participantList = res;
              //     this.sysTableService.getValues(SysTableService.dataTables.arrivalType.iSysTableId).then(data => {
              //       this.sysTableRowList = data;
              this.appProxy.post("GetParticipantsList", { iEventId: this.iEventId }).then(res => {
                if (res.length > 0) {
                  this.participantList = res;
                  this.lstDataRows=res;
                }
                this.buildGrid(this.lstDataRows, true);
              });
                   
                  // });
        
                // }
              // });
            }
          }
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
            this.buildGrid(res,false);

          });

          // });

        }

      });
    });
  }

  buildGrid(lst, refresh) {
    this.lstDataRows = [];
    lst.forEach(p => {
      let nvArriveStatusType = this.sysTableRowList.filter(s => s.iSysTableRowId == (p.lstObject ? p.lstObject.iArrivalStatusType : p.iArrivalStatusType));
      let iArriveStatusType = nvArriveStatusType && nvArriveStatusType[0] ? nvArriveStatusType[0].nvValue : ''

      // this.participant.forEach(p => {
      this.lstDataRows.push({
        delete: '<div class="delete"></div>',
        iEventId: p.iEventId,
        nvFirstName: p.nvFirstName,
        nvLastName: p.nvLastName,
        nvPhone: p.nvPhone,
        nvMobile: p.nvMobile,
        nvEmail: p.nvEmail,
        nvParticipantType: p.lstObject ? p.lstObject.nvParticipantType : p.nvParticipantType,
        iArriveStatusType: iArriveStatusType,
        iPersonId:p.iPersonId
        //iArriveStatusType: '<select> <option>j,k</option><option>ughjk</option></select>'
        // iArriveStatusType:'<button>fgd</button>'
        // iArriveStatusType: this.sysTableRowList.filter(s => s.iSysTableRowId == p.lstObject.iArrivalStatusType) &&
        //   this.sysTableRowList.filter(s => s.iSysTableRowId == p.lstObject.iArrivalStatusType)[0] ? this.sysTableRowList.filter(s => s.iSysTableRowId == p.lstObject.iArrivalStatusType)[0].nvValue : ''
      });
    });
    if (refresh)
      this.vyTableComponent.refreshTable(this.lstDataRows);
  }
  
  click(e) {
    // this.avrechId = e.iPersonId;
    if (e.columnClickName == "delete")
      this.delete(e);


  }

  delete(e) {
    this.appProxy.post('DeleteParticipant', { iEventId: this.iEventId, iPersonId: e.iPersonId, iUserId: this.globalService.getUser().iPersonId })
      .then(data => {
        this._parent.openMessagePopup('המחיקה בוצעה בהצלחה!');
        this.lstDataRows.splice(this.lstDataRows.findIndex(p=>p.iPersonId==e.iPersonId), 1);
        this.vyTableComponent.refreshTable(this.lstDataRows);
      }).catch(err => {
       // alert(err)
      });
  }
}




