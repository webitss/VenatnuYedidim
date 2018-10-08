import { Component, OnInit, ViewChild } from '@angular/core';
import { AppProxy } from '../../services/app.proxy';
import { Event1 } from '../../classes/event';
import { Router } from '@angular/router';
import { VyTableColumn } from '../../templates/vy-table/vy-table.classes';
import { GlobalService } from '../../services/global.service';
import { VyTableComponent } from '../../templates/vy-table/vy-table.component';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  protected eventsList: Event1[];
  @ViewChild('events') events: any;
  @ViewChild(VyTableComponent) vyTableComponent:VyTableComponent;

  constructor(private appProxy: AppProxy, private router: Router, private globalService:GlobalService) { }

  edit(e) {
    this.router.navigate(['events/event/', e.iEventId]);
  }

  deleteEvent(e) {
    this.appProxy.post('DeleteEvent', { iEventId: e.iEventId, iUserId: this.globalService.getUser()['iUserId'] }).then(res => {
      if (res == true) {
        alert('נמחק בהצלחה!');
        this.lstDataRows.splice(this.lstDataRows.indexOf(e),1);  
        this.vyTableComponent.refreshTable(this.lstDataRows);     
      }
      else {
        alert('לא נמחק!');
      }
    });
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
