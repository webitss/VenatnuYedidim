import { Component, OnInit, Input, Output, ViewChild, EventEmitter, Inject, forwardRef } from '@angular/core';
import { Event1 } from '../../classes/event';
import { ActivatedRoute, Router } from '@angular/router';
import { AppProxy } from '../../services/app.proxy';
import { NgForm } from '@angular/forms';
import { GlobalService } from '../../services/global.service';
import { SysTableService } from '../../services/sys-table.service';
import { AppComponent } from '../app/app.component';

@Component({
  selector: 'app-student-event-details',
  templateUrl: './student-event-details.component.html',
  styleUrls: ['./student-event-details.component.css']
})
export class StudentEventDetailsComponent implements OnInit {


  @Output()
  Close: EventEmitter<any> = new EventEmitter<any>();
  lst: Array<any>;
  @Input()
  @Output()
  event: Event1;
  @ViewChild(NgForm) form;
  @Input()
  iArrivalStatusType: number;
  isNew: boolean;

  constructor(private route: ActivatedRoute, private router: Router, private appProxy: AppProxy, private sysTableService: SysTableService,
    private globalService: GlobalService, @Inject(forwardRef(() => AppComponent)) private _parent: AppComponent) { }

  ngOnInit() {

    this.route.parent.params.subscribe(params => {
      this.id = params["iPersonId"]
    });

    if (this.event == null) {
      this.event = new Event1();
      this.event['iArrivalStatusType'] = null;
      this.event.nvName = null;
      this.isNew = true;
    }
    else {
      this.event['iArrivalStatusType'] = this.iArrivalStatusType;
      this.isNew = false;
    }
    this.appProxy.post("GetEventsList")
      .then(data => {
        this.eventsList = data;
      }).catch(err => {
        // alert(err);
      })


    this.sysTableService.getValues(SysTableService.dataTables.arrivalType.iSysTableId).then(data => {
      this.lst = data;
    });




  }


  id: number;
  flag: boolean = false;
  save() {
    this.flag == false
    this.appProxy.post("GetParticipantsList", { iEventId: this.event.iEventId }).then(res => {
      if (res.length > 0) {
        if (this.isNew == true) {
          res.forEach(p => {
            if (p.iPersonId == this.id)
              this.flag = true;
          });
        }
      }
      if (this.flag == true) {
        this._parent.openMessagePopup('לא ניתן לקבוע אירוע זה פעם נוספת!')
        this.close();
      }
      else {
        this.iArrivalStatusType = this.lst.find(x => x.nvValue == this.event['iArrivalStatusType']).iSysTableRowId;
        this.appProxy.post("SetEventParticipant", { isNew: this.isNew, iStatusType: this.iArrivalStatusType, iPersonId: this.id, iEventId: this.event.iEventId, iUserId: this.globalService.getUser().iPersonId })
          .then(data => {
            if (data == true) {
              this.lst.push(this.event);
              this._parent.openMessagePopup('האירוע נשמר בהצלחה!')
              this.close();
            }
          }).catch(err => {
            alert(err);
          });
      
    }
    });


}

eventsList: Array < Event1 > = new Array<Event1>();

@Input()
from: number = 0;

getEvents() {
  this.appProxy.post("GetEventsList")
    .then(data => {
      this.eventsList = data;
    }).catch(err => {
      //alert(err);
    })
}
close() {
  this.Close.emit(this.event);
}
chooseEvent(e) {
  if (e == '0')
    this.event = new Event1();
  else {
    this.event = this.eventsList.find(x => x.nvName == e);
    event['iArrivalStatusType'] = 0;
  }
}
}