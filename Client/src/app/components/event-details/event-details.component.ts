import { Component, OnInit, Output, Input } from '@angular/core';
import { AppProxy } from '../../services/app.proxy';
import { Event1 } from '../../classes/event';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

  //  e: Subject<Event1>=new BehaviorSubject<Event1>(new Event1());
  e: Event1;



  save() {
    this.appProxy.post("AddEvent", { oEvent: this.e })
      .then(
        data => {
          alert("success" + data);
        }).catch(err => {
          alert("error:" + err);
        });
  }

  ngOnChange() {
    console.log('child on change', this.e);
  }

  ngAfterViewInit() {
    console.log('child after view init', this.e);
    this.appProxy.post("AddEvent", { oEvent: this.e })
    .then(
      data => {
        alert("success" + data);
      }).catch(err => {
        alert("error:" + err);
      });
  }



  constructor(private appProxy: AppProxy) { }

  ngOnInit() {
    this.e = new Event1();
    this.e.nvName = 'lea';
    this.e.dtEventDate=new Date('01-01-2018');
  }

}
