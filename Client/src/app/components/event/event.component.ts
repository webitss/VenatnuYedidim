import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventDetailsComponent } from '../event-details/event-details.component';
import { EventsComponent } from '../events/events.component';
import { AppProxy } from '../../services/app.proxy';
@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  @ViewChild(EventDetailsComponent)
  private eventDetailsComp:EventDetailsComponent;

  constructor(private router: Router, private route: ActivatedRoute, private appProxy:AppProxy) {
  }

  isDetails: boolean = true;
  eventDetails() {
    this.isDetails = true;
    this.router.navigate(["/events/event/event-details"]);
  }
  eventParticipants() {
    this.isDetails = false;
    this.router.navigate(["/events/event/event-participants"]);
  }

  save() {
    if (this.route.snapshot.children[0].component == EventDetailsComponent) {
      this.eventDetailsComp.save();
    }


  }

 
  ngOnInit() {
    this.eventDetailsComp=new EventDetailsComponent(this.appProxy);
  }


}
