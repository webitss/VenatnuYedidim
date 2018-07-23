import { Component, OnInit, Output, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventDetailsComponent } from '../event-details/event-details.component';
import { EventsComponent } from '../events/events.component';
import { AppProxy } from '../../services/app.proxy';
import { Subject } from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { bloomAdd } from '@angular/core/src/render3/di';
import { ComponentFixture } from '@angular/core/testing';
import { Event1 } from '../../classes/event';
@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  @ViewChild(EventDetailsComponent)
  private eventDetailsComp:EventDetailsComponent;




  constructor(private router: Router, private route: ActivatedRoute, private appProxy:AppProxy,private cd: ChangeDetectorRef) {
  }

  isDetails: boolean = true;
  eventDetails() {
    this.isDetails = true;
    this.router.navigate(["/events/event/event-details"]);
  }
  eventParticipants() {
    this.isDetails = false;
    this.router.navigate(["/events/event/event-participants",1]);
  }

  save() {
    if (this.route.snapshot.children[0].component == EventDetailsComponent) {
    console.log('save eventDetailsComp', this.eventDetailsComp);

     this.eventDetailsComp.save();
    }


  }

  ngOnChange() {
    console.log('on change', this.eventDetailsComp.e);
  }

  ngAfterViewInit() {
    console.log('after view init', this.eventDetailsComp.e);
    console.log('ngAfterViewInit eventDetailsComp', this.eventDetailsComp);
    this.eventDetailsComp.e=new Event1();
//this.cd.detectChanges();
    
console.log('ngAfterViewInit eventDetailsComp', this.eventDetailsComp);


  }

 
  ngOnInit() {
    this.eventDetailsComp=new EventDetailsComponent(this.appProxy);
    console.log('ng On Init eventDetailsComp', this.eventDetailsComp);

    console.log('ng On Init', this.eventDetailsComp.e);


  }


}
