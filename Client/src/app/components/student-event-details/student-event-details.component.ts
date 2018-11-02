import { Component, OnInit, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { Event1 } from '../../classes/event';
import { ActivatedRoute, Router } from '@angular/router';
import { AppProxy } from '../../services/app.proxy';
import { NgForm } from '@angular/forms';
import { GlobalService } from '../../services/global.service';
import { SysTableService } from '../../services/sys-table.service';
import { EventParticipantsComponent } from '../event-participants/event-participants.component'

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

  constructor(private route: ActivatedRoute, private router: Router, private appProxy: AppProxy, private sysTableService: SysTableService, private globalService: GlobalService, private eventParticipant: EventParticipantsComponent) { }

  ngOnInit() {

    this.route.parent.params.subscribe(params => {
      this.id = params["iPersonId"]
    });

    if (this.event == null) {
      this.event = new Event1();
      this.event['iArrivalStatusType'] = 0;
      this.event.nvName = '';
    }
    else {
      this.event['iArrivalStatusType'] = this.iArrivalStatusType;
    }
    this.appProxy.post("GetEventsList")
      .then(data => {
        this.eventsList = data;
      }).catch(err => {
        alert(err);
      })
    // this.route.parent.params.subscribe(params => {
    //   if (params['iEventId'] != '0') {
    //     this.appProxy.post("GetEvent", { iPersonId: params['iEventId'] })
    //       .then(data => {
    //         this.event = data;
    //       }).catch(err => {
    //         alert(err);
    //       });
    //   }
    // });
    this.sysTableService.getValues(SysTableService.dataTables.arrivalType.iSysTableId).then(data => {
      this.lst = data;
    });

  }


  id: number;


  save() {
    if (this.eventParticipant.IsParticipantsExists(this.id, this.event.iEventId) == true)
      alert("תלמיד זה קיים כבר באירוע זה");
    else {
      this.appProxy.post("SetEvent", { iStatusType: this.event['iArrivalStatusType'], iPersonId: this.id, iEventId: this.event.iEventId, iUserId: this.globalService.getUser().iPersonId }).then(data => {
        if (data == true) {
          alert("האירוע נשמר בהצלחה!");
          close();
        }
      }).catch(err => {
        alert(err);
      });
    }
  }

  eventsList: Array<Event1> = new Array<Event1>();

  @Input()
  from: number = 0;

  getEvents() {
    this.appProxy.post("GetEventsList")
      .then(data => {
        this.eventsList = data;
      }).catch(err => {
        alert(err);
      })
  }
  close() {
    this.Close.emit();
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
