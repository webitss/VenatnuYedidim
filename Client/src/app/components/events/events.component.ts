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
  lstDataRows: any;
 


  constructor(private appProxy: AppProxy, private router:Router) { }


  public lstColumns = [{
    title: 'עריכה',
    name: 'aa',
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

  ngOnInit() {
    this.appProxy.post('GetEventsList', { iUserId: 0 }).then(res => {
      this.lstDataRows = res;
    })
  }

}
