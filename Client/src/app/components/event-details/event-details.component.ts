import { Component, OnInit, Output } from '@angular/core';
import { AppProxy } from '../../services/app.proxy';
import { Event } from '../../classes/event';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

 
  event: Event;


 save() {
   debugger;
    this.appProxy.post("AddEvent",{oEvent: this.event})
    .then(
      data=>{
      alert(data);
       }).catch(err=>{
         alert(err);
       });
  }


 
  constructor( private appProxy: AppProxy) { }

  ngOnInit() {
    this.event = new Event();
  }

}
