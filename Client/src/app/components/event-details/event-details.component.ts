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
  list: Array<any> = new Array<any>({value:"אברכים"}, {value:"תלמידים"},{value: "בוגרים"});
  title:string="רשימת תלמידים";
  inputTitle:string="עבור";

  protected e: Event1;


  save() {
    this.e.dtEventDate = new Date(this.e.dtEventDate);
    this.appProxy.post('SetEvent', { oEvent: this.e, iUserId: 1 })
      .then(
        data => {
          alert("success" + data);
        }).catch(err => {
          alert("error:" + err);
        });
  }


  private sub: any;
  private iEventId: number;
  isDetails: boolean;

  constructor(private appProxy: AppProxy, private router: ActivatedRoute) { }

  ngOnInit() {

    this.sub = this.router.parent.params.subscribe(params => {
      this.iEventId = +params["iEventId"];
      if (this.iEventId != 0) {
        this.isDetails = true;
        this.appProxy.post('GetEvent', { iEventId: this.iEventId }).then(data => {
          this.e = data;
        })
      }
      else {
        this.e = new Event1();
        this.isDetails = false;

      }
    });



  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}


