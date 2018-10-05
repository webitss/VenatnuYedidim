import { Component, OnInit, Output, Input, ViewChild, EventEmitter } from '@angular/core';
import { AppProxy } from '../../services/app.proxy';
import { Event1 } from '../../classes/event';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { EventComponent } from '../event/event.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArrayName, NgForm } from '@angular/forms';
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

  @ViewChild(NgForm) form;

  checkFormValidity() {
    return this.form.valid;
  }

  ngAfterViewInit() {
    if (this.isDetails)
      this.isValid = this.form.valid;
    else
      this.isValid = this.form.valid && this.selectValid;

  }

  selectValid = false;
  isValid = false;

  checkIfSelectIsValid() {
    if (this.to != undefined)
      return this.to.length > 0;
    return false;
  }

  @ViewChild('child') VyMultySelect: VyMultySelectComponent;


  save() {
    if (!this.isDetails) {
      this.participantsToSend.splice(0, this.participantsToSend.length);
      this.e.dtEventDate = new Date(this.e.dtEventDate);
      this.to.forEach(t => {
        this.participantsToSend.push(new Tint(t.iSysTableRowId));
      })
    }

    this.appProxy.post('SetEvent', { oEvent: this.e, iUserId: this.globalService.getUser()['iUserId'], to: this.participantsToSend })
      .then(
        data => {
          this.route.navigate(['events/']);
        }).catch(err => {
          alert("error:" + err);
        });
  }

  @Output() updateValid = new EventEmitter();

  getFromChild(list: Array<any>) {
    this.to = list;
    this.selectValid = this.checkIfSelectIsValid();
    this.isValid = this.selectValid && this.form.valid;
  }
  private sub: any;
  private iEventId: number;
  isDetails: boolean;
  sysTableRowList: SysTableRow[];

  constructor(private appProxy: AppProxy, private router: ActivatedRoute, private sysTableService: SysTableService,
    private globalService: GlobalService, private route: Router) { }

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
        s['value'] = s.nvValue;
      })
    }, err => {
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
