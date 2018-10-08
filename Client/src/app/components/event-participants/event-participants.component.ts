import { Component, OnInit } from '@angular/core';
import { AppProxy } from '../../services/app.proxy';
import { Participants } from '../../classes/participants';
import { ActivatedRoute } from '@angular/router';
import { SysTableRow } from '../../classes/SysTableRow';
import { SysTableService } from '../../services/sys-table.service';
import { VyTableColumn } from '../../templates/vy-table/vy-table.classes';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-event-participants',
  templateUrl: './event-participants.component.html',
  styleUrls: ['./event-participants.component.css']
})
export class EventParticipantsComponent implements OnInit {
  protected iEventId: number;
  private sub: any;
  protected participant: Array<any> = new Array<any>();
  protected sysTableRowList: SysTableRow[];
  protected iPerson: number;
  protected flag;
  protected iLastModifyUserId: number;
  protected s: any;
  constructor(private appProxy: AppProxy, private router: ActivatedRoute, private sysTableService: SysTableService) { }

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
  ngOnInit() {

    this.sub = this.router.parent.params.subscribe(params => {
      this.iEventId = +params['iEventId'];
      this.appProxy.post( "GetParticipantsList" , { iEventId: this.iEventId }).then(res => {

        this.sysTableService.getValues(SysTableService.dataTables.arrivalType.iSysTableId).then(data => {
          this.sysTableRowList = data;
          //  this.sysTableRowList.forEach(pr => {
          //   this.s = pr });
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
           this.lstDataRows.forEach( p => {
             p['delete'] = '<div class="delete"></div>';
           });
        });
        // alert("x");
      })
    });
  }
  // public deleteYeshiva(yeshiva) {
  //   this.iPerson=yeshiva.iYeshivaId;
  //   this.flag=true;
  // }

  // delete() {
  //   this.appProxy.post('DeleteParticipant',{iYeshivaId:this.iPerson,iLastModifyUserId:this.iLastModifyUserId})
  //   .then(
  //       data=>{
  //       this.iPerson=data;
  //       alert("המשתתף נמחק בהצלחה");
  //   });
  // }

  // close() {
  //   this.iPerson = null;
  //   this.flag=null;
  // }
  // ngOnDestroy() {
  //   this.sub.unsubscribe();
  // }



}
