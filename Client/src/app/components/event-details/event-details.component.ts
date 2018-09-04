import { Component, OnInit, Output, Input, ViewChild } from '@angular/core';
import { AppProxy } from '../../services/app.proxy';
import { Event1 } from '../../classes/event';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { EventComponent } from '../event/event.component';
import { ActivatedRoute } from '@angular/router';
import { FormArrayName } from '@angular/forms';
import { PARAMETERS } from '@angular/core/src/util/decorators';
import { Tint } from '../../classes/tint';
import { SysTableService } from '../../services/sys-table.service';
import { SysTableRow } from '../../classes/SysTableRow';
import { VyMultySelectComponent } from '../../templates/vy-multy-select/vy-multy-select.component';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  list: Array<any> = new Array<any>();
  title: string = "";
  inputTitle: string = "עבור";
  touched = false;

  protected e: Event1;
  to: Array<any>;
  participantsToSend: Array<Tint> = new Array<Tint>();

  @ViewChild('child') VyMultySelect: VyMultySelectComponent;


  save() {
    this.participantsToSend.splice(0, this.participantsToSend.length);
    this.e.dtEventDate = new Date(this.e.dtEventDate);
    this.to.forEach(t => {
      this.participantsToSend.push(new Tint(t.iSysTableRowId));
    })
    // this.VyMultySelect.save();

    this.appProxy.post('SetEvent', { oEvent: this.e, iUserId: this.globalService.getUser()['iUserId'], to: this.participantsToSend })
      .then(
        data => {
          alert("success" + data);
        }).catch(err => {
          alert("error:" + err);
        });
  }

  getFromChild(list: Array<any>) {
    this.to = list;
  }
  private sub: any;
  private iEventId: number;
  isDetails: boolean;
  sysTableRowList: SysTableRow[];

  constructor(private appProxy: AppProxy, private router: ActivatedRoute, private sysTableService: SysTableService,
    private globalService: GlobalService) { }

  ngOnInit() {

    this.sub = this.router.parent.params.subscribe(params => {
      this.iEventId = +params["iEventId"];
      if (this.iEventId != 0) {
        this.isDetails = true;
        this.appProxy.post('GetEvent', { iEventId: this.iEventId }).then(data => {
          this.e = data;
        })
      }
      else {
        this.e = new Event1();
        this.isDetails = false;

      }
    });


    this.sysTableService.getValues(SysTableService.dataTables.participationType.iSysTableId).then(data => {
      this.sysTableRowList = data;
      this.sysTableRowList.forEach(s => {
        // s.iSysTableRowId
        s['value'] = s.nvValue;
      })
      //alert("success"+this.sysTableRowList[0].nvValue);
    }, err => {
      // alert("error")
    })

    //this.participantsToSend=new Array<string>();

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}


