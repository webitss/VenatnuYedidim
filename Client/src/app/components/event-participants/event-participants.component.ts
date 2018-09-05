import { Component, OnInit } from '@angular/core';
import { AppProxy } from '../../services/app.proxy';
import { Participants } from '../../classes/participants';
import { ActivatedRoute } from '@angular/router';
import { SysTableRow } from '../../classes/SysTableRow';
import { SysTableService } from '../../services/sys-table.service';
import { VyTableColumn } from '../../templates/vy-table/vy-table.classes';

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
 
  constructor(private appProxy: AppProxy, private router: ActivatedRoute, private sysTableService: SysTableService) { }

  public lstColumns = [
    new VyTableColumn('שם פרטי','nvFirstName'),
    new VyTableColumn('שם משפחה','nvLastName'),
    new VyTableColumn('טלפון','nvPhone'),
    new VyTableColumn('נייד','nvMobile'),
    new VyTableColumn('מייל','nvEmail'),
    new VyTableColumn('סוג משתמש','nvParticipantType'),
    new VyTableColumn('סטטוס הגעה','iArriveStatusType','html', true,false), ];
      public lstDataRows = [];
    
  ngOnInit() {

    this.sub = this.router.parent.params.subscribe(params => {
      this.iEventId = +params['iEventId'];
      this.appProxy.post("GetParticipantsList", { iEventId: this.iEventId }).then(data => {
        this.participant = data;
        this.participant.forEach(p => {
          this.lstDataRows.push({
            iEventId: p.iEventId,
            nvFirstName: p.nvFirstName,
            nvLastName: p.nvLastName,
            nvPhone: p.nvPhone,
            nvMobile: p.nvMobile,
            nvEmail: p.nvEmail,
            nvParticipantType: p.nvParticipantType,
           // iArriveStatusType: p.iArriveStatusType,
            iArriveStatusType:'<select value="'+p.iArriveStatusType+'"> <option *ngFor="let s of sysTableRowList" [ngValue]="s.nvValue" >{{s.nvValue}}</option></select>'
          
          });
        });
        
        this.sysTableService.getValues(SysTableService.dataTables.arrivalType.iSysTableId).then(data => {
          this.sysTableRowList = data;
          this.participant.forEach(p => {
            // debugger;
            p['iArriveStatusType'] = this.sysTableRowList.filter(s => s.iSysTableRowId ==parseInt (p.lstObject.iArrivalStatusType))[0].nvValue;
            p['nvParticipantType'] = p.lstObject.nvParticipantType;
            
          });

        });
        // alert("x");
      })
    });
  }


  ngOnDestroy() {
    this.sub.unsubscribe();
  }



}
