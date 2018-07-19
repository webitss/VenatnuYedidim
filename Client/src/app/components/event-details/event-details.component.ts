import { Component, OnInit, Output, Input } from '@angular/core';
import { AppProxy } from '../../services/app.proxy';
import { Event1 } from '../../classes/event';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { EventComponent } from '../event/event.component';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

  protected e: Event1;



  save() {
    this.appProxy.post('AddEvent', { addEvent: this.e })
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
  }

}
