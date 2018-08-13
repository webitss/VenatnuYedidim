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

  protected e: Event1;

  
// header:string;

// getHeader(){
//   return this.header;
// }

  
// getUser(){
  
// }
  save() {
 //  this.date=new Date(this.e.dtEventDate);
   this.e.dtEventDate = new Date(this.e.dtEventDate);

    this.appProxy.post('SetEvent', { oEvent: this.e,  iUserId: 1})
      .then(
        data => {
          alert("success" + data);
        }).catch(err => {
          alert("error:" + err);
        });
  }


  private sub: any;
    private iEventId: number;





  constructor(private appProxy: AppProxy, private router: ActivatedRoute) { }

  ngOnInit() {

    this.sub = this.router.parent.params.subscribe(params => {
      this.iEventId = +params["iEventId"];
      if(this.iEventId!=0){
        this.appProxy.post('GetEvent', {iEventId:this.iEventId}).then(data=>{
          this.e=data;
        })
      }
      else{
        this.e=new Event1();
      }
  });

  
   
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
}
  }


