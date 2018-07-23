import { Component, OnInit } from '@angular/core';
import { AppProxy } from '../../services/app.proxy';
import { Participants } from '../../classes/participants';

@Component({
  selector: 'app-event-participants',
  templateUrl: './event-participants.component.html',
  styleUrls: ['./event-participants.component.css']
})
export class EventParticipantsComponent implements OnInit {
  protected iEventId: number = 1;
  protected participant: Array<any> = new Array<any>();
  protected lstColumns = [{
      title: 'שם פרטי',
      name: 'nvFirstName'    
    },{
      title: 'שם משפחה',
      name: 'nvLastName'    
    }

  ]

  constructor(private appProxy: AppProxy) { }

  ngOnInit() {
    this.appProxy.post("GetParticipantsList", { iEventId: this.iEventId })
      .then(
        data => {
          this.participant = data;
          alert("good");
        })
  }

}