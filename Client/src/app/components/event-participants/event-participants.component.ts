import { Component, OnInit } from '@angular/core';
import { AppProxy } from '../../services/app.proxy';
import { Participants } from '../../classes/participants';

@Component({
  selector: 'app-event-participants',
  templateUrl: './event-participants.component.html',
  styleUrls: ['./event-participants.component.css']
})
export class EventParticipantsComponent implements OnInit {
  iEventId:number=1;
participant:Participants[];
  constructor(private appProxy:AppProxy) { }

  ngOnInit() {
    this.appProxy.post("GetParticipantsList",{iEventId:this.iEventId})
    .then(
    data=>{
      this.participant=data;
      alert("good");
    },err=>{
    alert(err);
    });
  }
  
  }