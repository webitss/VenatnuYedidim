import { Component, OnInit } from '@angular/core';
import { AppProxy } from '../../services/app.proxy';
import { Participants } from '../../classes/participants';
import { ActivatedRoute } from '@angular/router';
import { SysTableRow } from '../../classes/SysTableRow';
import { SysTableService } from '../../services/sys-table.service';

@Component({
  selector: 'app-event-participants',
  templateUrl: './event-participants.component.html',
  styleUrls: ['./event-participants.component.css']
})
export class EventParticipantsComponent implements OnInit {
  protected iEventId: number;
  private sub: any;
  protected participant: Array<any> = new Array<any>();
  sysTableRowList: SysTableRow[];
  protected lstColumns = [{
    title: 'שם פרטי',
    name: 'nvFirstName'
  }, {
    title: 'שם משפחה',
    name: 'nvLastName'
  }, {
    title: 'טלפון',
    name: 'nvPhone'
  }, {
    title: 'נייד',
    name: 'nvMobile'
  }, {
    title: 'מייל',
    name: 'nvEmail'
  }, {
    title: 'סוג משתתף',
    name: 'iParticipantType'
  }, {
    title: 'סטטוס הגעה',
    name: 'iArriveStatusType'
  },

  ]



  constructor(private appProxy: AppProxy, private router: ActivatedRoute, private sysTableService: SysTableService) { }

  ngOnInit() {

    this.sub = this.router.parent.params.subscribe(params => {
      this.iEventId = +params['iEventId'];
      this.appProxy.post("GetParticipantsList", { iEventId: this.iEventId }).then(data => {
        this.participant = data;
        this.sysTableService.getValues(SysTableService.dataTables.arrivalType.iSysTableId).then(data => {
          this.sysTableRowList = data;
          this.participant.forEach(p => {

            p['iArriveStatusType'] = this.sysTableRowList.filter(s => s.iSysTableRowId ==parseInt (p.lstObject.iArrivalStatusType))[0].nvValue;
            p['iParticipantType'] = this.sysTableRowList.filter(s => s.iSysTableRowId ==parseInt (p.lstObject.iArrivalStatusType))[0].nvValue;
          });


        });
        alert("x");
      })
    });



  }


  ngOnDestroy() {
    this.sub.unsubscribe();
  }



}
