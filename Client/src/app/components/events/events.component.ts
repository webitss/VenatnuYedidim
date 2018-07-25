import { Component, OnInit } from '@angular/core';
import { AppProxy } from '../../services/app.proxy';
import { Event1 } from '../../classes/event';
import { Router } from '@angular/router';

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
  public lstColumns = [{
    title: 'עריכה',
    type: 'html',
  clickCell: true ,
    titleStyle: {
      width: '25%',
    },
    filterStyle: {
      width: '25%'
    },
    cellStyle: {
      width: '25%',
    }
  },
  {
    title: 'שם ארוע',
    name: 'nvName',
    filterStyle: {
      width: '25%'
    },
    cellStyle: {
      width: '25%'
    }
  },

  {
    title: 'תאריך',
    name: 'dtEventDate',
    titleStyle: {
      width: '25%'
    },
    filterStyle: {
      width: '25%'
    },
    cellStyle: {
      width: '25%',
    }
  },
  {
    title: 'מקום',
    name: 'nvPlace',

    filterStyle: {
      width: '25%'
    },
    cellStyle: {
      width: '25%'
    }
  }
  ]
  public lstDataRows = [];


  ngOnInit() {

    this.appProxy.post('GetEventsList', { iUserId: 0 }).then(res => {
      res.forEach(e => {
        this.lstDataRows.push({
          iEventId: e.iEventId,
          nvName: e.nvName,
          dtEventDate: e.dtEventDate.toLocaleDateString(),
          nvPlace: e.nvPlace,
          edit: '<span>עריכה</span>'

        });

      });
    }
    )


  }

}
