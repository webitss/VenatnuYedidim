import { Component, OnInit, ViewChild, Inject, forwardRef } from '@angular/core';
import { AppProxy } from '../../services/app.proxy';
import { Event1 } from '../../classes/event';
import { Router } from '@angular/router';
import { VyTableColumn } from '../../templates/vy-table/vy-table.classes';
import { GlobalService } from '../../services/global.service';
import { VyTableComponent } from '../../templates/vy-table/vy-table.component';
import { AppComponent } from '../app/app.component';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  protected eventsList: Event1[];
  @ViewChild('events') events: any;
  @ViewChild(VyTableComponent) vyTableComponent: VyTableComponent;
  message:string;
  flag = false;
  header = "מחיקת אירוע";
  eventIdToDelete:number;
  // myFunc() {
  //   alert('sadsa');
  // }
  constructor(private appProxy: AppProxy, private router: Router, private globalService: GlobalService,@Inject(forwardRef(() => AppComponent)) private _parent:AppComponent) { }

  edit(e) {
    this.router.navigate(['events/event/', e.iEventId]);
  }

  deleteEvent(e) {
    this.appProxy.post('DeleteEvent', { iEventId: e, iUserId: this.globalService.getUser()['iUserId'] }).then(res => {
      if (res == true) {
        this._parent.openMessagePopup('נמחק בהצלחה!');
        const i=this.lstDataRows.findIndex(x=>x.iEventId==e);
        this.lstDataRows.splice(i, 1);
        this.vyTableComponent.refreshTable(this.lstDataRows);
      }
      else {
        alert('לא נמחק!');
      }
    });
  }

  deleteE(e: Event1) {
    this.message='האם אתה בטוח שברצונך למחוק את אירוע '+e.nvName+'?';
    this.eventIdToDelete=e.iEventId;
    this.flag=true;
  }

  click(e) {
    // this.avrechId = e.iPersonId;
    if (e.columnClickName == "edit")
      this.edit(e);
    else
      this.deleteE(e);

  }

  public lstColumns = [
    new VyTableColumn('', 'edit', 'html', true, false),
    new VyTableColumn('', 'delete', 'html', true, false),
    new VyTableColumn('שם ארוע', 'nvName'),
    new VyTableColumn('תאריך', 'dtEventDate'),
    new VyTableColumn('מקום', 'nvPlace')];
  public lstDataRows = [];


  ngOnInit() {



    this.appProxy.post('GetEventsList').then(res => {
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
