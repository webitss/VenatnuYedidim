import { Component, OnInit } from '@angular/core';
import { AppProxy } from '../../services/app.proxy';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  constructor(private appProxy:AppProxy) { }

  ngOnInit() {

    this.appProxy.post('GetEventsList', { iUserId: 0 }).then(res => {
      res.forEach(e => {
       // this.lstDataRows.
      });
     // this.lstDataRows = res;
    })
  }

}
