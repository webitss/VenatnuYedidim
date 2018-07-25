import { Component, OnInit, Output, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventDetailsComponent } from '../event-details/event-details.component';
import { EventsComponent } from '../events/events.component';
import { AppProxy } from '../../services/app.proxy';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { bloomAdd } from '@angular/core/src/render3/di';
import { ComponentFixture } from '@angular/core/testing';
import { Event1 } from '../../classes/event';
@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  protected currentComponent: any;

  constructor(private router: Router, private route: ActivatedRoute, private appProxy: AppProxy) {


  }

  onRouterOutletActivate(event) {
    this.currentComponent = event;
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

    if (this.currentComponent.save) this.currentComponent.save();
  }

  ngOnInit() {

  }


}
