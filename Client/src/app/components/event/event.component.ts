import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventDetailsComponent } from '../event-details/event-details.component';
import { EventsComponent } from '../events/events.component';
import { AppProxy } from '../../services/app.proxy';
import { Subject } from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { bloomAdd } from '@angular/core/src/render3/di';
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

  ngOnChange() {
    console.log('on change', this.eventDetailsComp.e);
  }

  ngAfterViewInit() {
    console.log('after view init', this.eventDetailsComp.e);
  }

 
  ngOnInit() {
    console.log('ng On Init', this.eventDetailsComp.e);
    this.eventDetailsComp=new EventDetailsComponent(this.appProxy);
   this.eventDetailsComp.e.subscribe(val=>{
     val.nvName='lea';
   })
   console.log('ng On Init after subscribe', this.eventDetailsComp.e);

  }


}
