import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  constructor(private router:Router) { }
 
  isDetails:boolean=true;
  eventDetails(){
    this.isDetails=true;
    this.router.navigate(["/events/event/event-details"]);
  }
  eventParticipants(){
    this.isDetails=false;
    this.router.navigate(["/events/event/event-participants"]);
  }
  ngOnInit() {
  }


}
