﻿import { Component, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('events') events: any;

  constructor(private appProxy: AppProxy, private router: Router) { }

  edit(e) {
    this.router.navigate(['events/event/', e.iEventId]);
  }

  deleteEvent(e) {
    //alert('delete');
  }

  click(e) {
    // this.avrechId = e.iPersonId;
    if (e.columnClickName == "edit")
      this.edit(e);
    else
      this.deleteEvent(e);

  }

  public lstColumns = [
    new VyTableColumn('עריכה', 'edit', 'html', true, false),
    new VyTableColumn('מחיקה', 'delete', 'html', true, false),
    new VyTableColumn('שם ארוע', 'nvName'),
    new VyTableColumn('תאריך', 'dtEventDate'),
    new VyTableColumn('מקום', 'nvPlace')];
  public lstDataRows = [];


  ngOnInit() {



    this.appProxy.post('GetEventsList', { iUserId: 0 }).then(res => {
      res.forEach(e => {
        this.lstDataRows.push({
          iEventId: e.iEventId,
          nvName: e.nvName,
          dtEventDate: e.dtEventDate.toLocaleDateString(),
          nvPlace: e.nvPlace,
          edit: '<div class="edit"></div>',
          delete: '<div class="delete"></div>'
        });
      });
    }
    )


  }
  downloadExcel() {
    this.events.downloadExcel();
  }
  tableToPdf(name: string) {
    this.events.downloadPdf(name, 'pdf');
  }
}
