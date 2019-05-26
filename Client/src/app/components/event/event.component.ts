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

  public currentComponent: any;

  constructor(private router: Router, private route: ActivatedRoute, private appProxy: AppProxy, private cdr: ChangeDetectorRef) {


  }
  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  onRouterOutletActivate(event) {
    this.currentComponent = event;
  }

  isDetails: boolean = true;

  formValid = false;

  isDisabled(): boolean {
    debugger;
    if (this.currentComponent.form) {
      return this.currentComponent.form.valid;
    }
    debugger;
    if(this.currentComponent.flagUpdate==true)
    return true;
    return false;
  }




  save() {
    if (this.currentComponent.save) this.currentComponent.save();
  }
  e: Event1;
  header: string;
  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['iEventId'] != '0') {
        this.isDetails = true;
        this.appProxy.post("GetEvent", { iEventId: params['iEventId'] })
          .then(data => {
            this.e = data;
            this.header = this.e.nvName;

          });
      }
      else {
        this.isDetails = false;
        this.header = 'אירוע חדש';
      }
    });

  }


}


// קישור לאפיון

// https://www.justinmind.com/usernote/tests/31601930/35552372/35552374/index.html