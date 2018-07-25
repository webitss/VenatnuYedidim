import { Component, OnInit, Output, Input } from '@angular/core';
import { AppProxy } from '../../services/app.proxy';
import { Event1 } from '../../classes/event';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { EventComponent } from '../event/event.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

  @Input()
  @Output()
  protected e: Event1;

  

  protected date: Date;

  

  save() {
    this.e.dtEventDate = new Date(this.date);
    this.appProxy.post('SetEvent', { oEvent: this.e,  iUserId: 1})
      .then(
        data => {
          alert("success" + data);
        }).catch(err => {
          alert("error:" + err);
        });
  }





  constructor(private appProxy: AppProxy, private router: ActivatedRoute) { }

  ngOnInit() {
    this.date=new Date();
    this.router.params.subscribe(params => {
      if (params['iEventId'] != '0') {
        this.appProxy.post("GetEvent", { iEventId: params['iEventId'] })
          .then(data => {
           // this.e=new Event1();
            this.e = data;
            this.date=this.e.dtEventDate;
          });
      }
      else {
        this.e = new Event1();
      }
    });
  }
  }


