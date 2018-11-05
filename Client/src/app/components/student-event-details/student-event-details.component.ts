import { Component, OnInit, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { Event1 } from '../../classes/event';
import { ActivatedRoute, Router } from '@angular/router';
import { AppProxy } from '../../services/app.proxy';
import { NgForm } from '@angular/forms';
import { GlobalService } from '../../services/global.service';
import { SysTableService } from '../../services/sys-table.service';

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

  constructor(private route: ActivatedRoute, private router: Router, private appProxy: AppProxy, private sysTableService: SysTableService, private globalService: GlobalService) { }

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
    this.globalService.IsParticipantsExists(this.id, this.event.iEventId).then(data => {
      if (data)
        alert("תלמיד זה קיים כבר באירוע זה");
      else {
        this.iArrivalStatusType = this.lst.find(x=>x.nvValue == this.event['iArrivalStatusType']).iSysTableRowId;
        this.appProxy.post("SetEventParticipant", {isNew: this.isNew, iStatusType: this.iArrivalStatusType, iPersonId: this.id, iEventId: this.event.iEventId, iUserId: this.globalService.getUser().iPersonId })
          .then(data => {
            if (data == true) {
              this.lst.push(this.event);
              alert("האירוע נשמר בהצלחה!");
              this.close();
            }
          }).catch(err => {
            //alert(err);
          });
      }
    }).catch(err => {
      //alert(err);
    })
  }

  eventsList: Array<Event1> = new Array<Event1>();

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
