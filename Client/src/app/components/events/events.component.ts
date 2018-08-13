import { Component, OnInit } from '@angular/core';
import { AppProxy } from '../../services/app.proxy';
import { Event1 } from '../../classes/event';
import { Router } from '@angular/router';
import { VyTableColumn } from '../../templates/vy-table/vy-table.classes';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  protected eventsList: Event1[];


  constructor(private appProxy: AppProxy, private router: Router) { }

edit(e){
  this.router.navigate(['events/event/', e.iEventId]);

}
  public lstColumns = [
new VyTableColumn('עריכה','edit','html', true),
new VyTableColumn('שם ארוע','nvName'),
new VyTableColumn('תאריך','dtEventDate'),
new VyTableColumn('מקום','nvPlace') ];
  public lstDataRows = [];


  ngOnInit() {



    this.appProxy.post('GetEventsList', { iUserId: 0 }).then(res => {
      res.forEach(e => {
        this.lstDataRows.push({
          iEventId: e.iEventId,
          nvName: e.nvName,
          dtEventDate: e.dtEventDate.toLocaleDateString(),
          nvPlace: e.nvPlace,
          edit: '<div class="edit"></div>'

        });

      });
    }
    )


  }

}
