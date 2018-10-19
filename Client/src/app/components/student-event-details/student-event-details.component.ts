import { Component, OnInit, Input, Output, ViewChild } from '@angular/core';
import { Event1 } from '../../classes/event';
import { ActivatedRoute } from '@angular/router';
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

  lst: Array<any>;
  @Input()
  @Output()
  event: Event1;
  @ViewChild(NgForm) form;
  e;
  constructor(private route: ActivatedRoute, private appProxy: AppProxy, private sysTableService: SysTableService, private globalService: GlobalService) { }

  ngOnInit() {
    this.event = new Event1();
    this.route.parent.params.subscribe(params => {
      if (params['iEventId'] != '0') {
        this.appProxy.post("GetEvent", { iPersonId: params['iEventId'] })
          .then(data => {
            this.event = data;
          }).catch(err => {
            alert(err);
          });
      }
    });
    this.sysTableService.getValues(4).then(data => {
      this.lst = data;
    });
  }
  // saveEvent() {
  //   this.appProxy.post("SetEvent", { user: this.user, iUserId: 1 }).then(data => {
  //     if (data == true) {
  //       alert("המשתמש נשמר בהצלחה!");
  //       this.router.navigate(['users']);
  //     }
  //     else
  //       alert("error!");
  //   }).catch(err=>{
  //     alert(err);
  //   });
  // }

  eventsList: Array<Event1> = new Array<Event1>();

  getEvents() {
    this.appProxy.post("GetEventsList", { iUserId: this.globalService.getUser().iPersonId })
      .then(data => {
        this.eventsList = data;
      }).catch(err => {
        alert(err);
      })
  }
}
