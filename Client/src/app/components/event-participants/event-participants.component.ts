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
  protected participant: Array<any> = new Array<any>();
  protected lstColumns = [{
      title: 'שם משפחה',
      name: 'nvLastName'    
    },{
      title: 'שם פרטי',
      name: 'nvFirstName'    
    },
    {
      title: 'טלפון',
      name: 'nvPhone'    
    },
    {
      title: 'נייד',
      name: 'nvMobile'    
    },
    {
      title: 'מייל',
      name: 'nvEmail'    
    },
    {
      title: 'סוג משתתף',
      name: 'iArrivalStatusType'    
    },
    {
      title: 'סטטוס הגעה',
      name: 'nvValue'    
    },
    
    



  ]

  constructor(private appProxy: AppProxy, private route:ActivatedRoute) { }

  ngOnInit() {
this.iEventId =parseInt( this.route.snapshot.paramMap.get('IEventId'));
    
    this.appProxy.post("GetParticipantsList", { iEventId: this.iEventId })
      .then(
        data => {
          this.participant = data;
          alert("good");
        })
  }

}