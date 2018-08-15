import { Component, OnInit } from '@angular/core';
import { AppProxy } from '../../services/app.proxy';
import { Participants } from '../../classes/participants';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-participants',
  templateUrl: './event-participants.component.html',
  styleUrls: ['./event-participants.component.css']
})
export class EventParticipantsComponent implements OnInit {
  protected iEventId: number;
  private sub:any;
  protected participant: Array<any> = new Array<any>();
  protected lstColumns = [{
    title: 'שם פרטי',
    name: 'nvFirstName'
  }, {
    title: 'שם משפחה',
    name: 'nvLastName'
  }, {
    title: 'טלפון',
    name: 'nvPhone'
  }, {
    title: 'נייד',
    name: 'nvMobile'
  }, {
    title: 'מייל',
    name: 'nvEmail'
  }, {
    title: 'סוג משתתף',
    name: 'nvValue'
  }, {
    title: 'סטטוס',
    name: 'nvValue'
  },

  ]



  constructor(private appProxy: AppProxy, private router: ActivatedRoute) { }

  ngOnInit() {

   this.sub= this.router.parent.params.subscribe(params=>{
     this.iEventId=+params['iEventId'];
this.appProxy.post("GetParticipantsList", {iEventId:this.iEventId}).then(data=>{
  this.participant=data;
  alert("שגיאה בגישה לשרת");
})
    });

  

}


ngOnDestroy() {
  this.sub.unsubscribe();
}



}