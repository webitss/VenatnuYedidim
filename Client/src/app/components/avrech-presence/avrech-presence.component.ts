import { Component, OnInit, ViewChild, Output, Input, Inject, forwardRef } from '@angular/core';
import { AppProxy } from '../../services/app.proxy';
import { ActivatedRoute } from '@angular/router';
import { SysTableService } from '../../services/sys-table.service';
import { VyTableColumn } from '../../templates/vy-table/vy-table.classes';
import { PresenceAvrech } from '../../classes/presenceAvrech';
import { VyTableComponent } from '../../templates/vy-table/vy-table.component';
import { GlobalService } from '../../services/global.service';
import { AppComponent } from '../app/app.component';

@Component({
  selector: 'app-avrech-presence',
  templateUrl: './avrech-presence.component.html',
  styleUrls: ['./avrech-presence.component.css']
})
export class AvrechPresenceComponent implements OnInit {


  private sub: any;
  private iPersonId: number;
  protected PA: PresenceAvrech;
  presences: any;
  flag:number;
  @Output()
  @Input()
  presence:PresenceAvrech;
  @ViewChild(VyTableComponent) cc:VyTableComponent;
  flagDelete = false;
  header = 'מחיקת פגישה';
  message = '';
  deletPresence: PresenceAvrech;
  constructor(private appProxy: AppProxy, private router: ActivatedRoute, @Inject(forwardRef(() => AppComponent)) private _parent: AppComponent, private sysTableService: SysTableService,private globalService: GlobalService) { }

  public lstColumns = [
    new VyTableColumn('', 'edit', 'html', true, false),
    new VyTableColumn('', 'delete', 'html', true, false),
    new VyTableColumn('תאריך', 'nvDate'),
    new VyTableColumn('סך שעות', 'iHoursSum')
  ];
  public lstDataRows = [];
  ngOnInit() {
    this.sub = this.router.parent.params.subscribe(params => {
      this.iPersonId = +params["iPersonId"];
      debugger;
      this.loadPresences();

    });
  }
  loadPresences() {
    debugger;
    this.appProxy.post('GetPresenceAvrechById', { iPersonId: this.iPersonId }).then(res => {
      this.presences = res;
      this.presences.forEach(p => {
        this.lstDataRows.push({
          iPersonId: p.iPersonId,
          iPresenceAvrech: p.iPresenceAvrech,
          ['nvDate']: p.dtDatePresence.toLocaleDateString(),
          dtDatePresence: p.dtDatePresence,
          iHoursSum: p.iHoursSum,
          edit: '<div class="edit"></div>',
          delete: '<div class="delete"></div>',
        });
      })
      // this.PA = data;
      // alert(data.length);

    })

  }

  click(p) {
    if (p.columnClickName == 'delete')
      this.delPres(p);
    else
      this.presence = p;
    this.flag = 1;

  }

  


  delPres(p: PresenceAvrech) {
    this.deletPresence = p;
    this.message = 'האם אתה בטוח שברצונך למחוק פגישה זו?';
    this.flagDelete = true;
  }

  deletePres(p: PresenceAvrech) {
    this.appProxy.post('DeletePresenceAvrech', { iPresenceAvrech: p.iPresenceAvrech, iLastModifyUserId: this.globalService.getUser()['iUserId'] }).then(data => {
      if(data)
      {
        this._parent.openMessagePopup('נמחק בהצלחה!');
        this.lstDataRows.splice(this.presences.indexOf(p), 1);
        this.cc.refreshTable(this.lstDataRows);
      }
      else
      {
        this._parent.openMessagePopup('ארעה שגיאה במחיקה!');
      }
      
    });
  }

  editPresence(p: PresenceAvrech) {
    debugger;
     this.presence = p;
  }
  addPresence() {
    this.presence = new PresenceAvrech();
    this.presence.dtDatePresence = new Date();
    this.presence.iPersonId = this.iPersonId;
  }
  closePresenceDialog(event,save) {
    debugger;
    let index;
    if (save == true) {
      for (let i = 0; i < this.lstDataRows.length; i++) {
        if (this.lstDataRows[i].iPresenceAvrech == this.presence.iPresenceAvrech) {
          index = i;
          break;
        }
      }
      if (index == undefined) {
        this.lstDataRows.push({
          iPersonId: event.iPersonId,
          iPresenceAvrech: event.iPresenceAvrech,
          ['nvDate']:event.dtDatePresence?event.dtDatePresence: new Date().toLocaleDateString(),
          // dtDatePresence:this.presence.dtDatePresence,
          iHoursSum: event.iHoursSum,
          edit: '<div class="edit"></div>',
          delete: '<div class="delete"></div>',
        });
      }
      else {
        this.lstDataRows[index].iHoursSum = event.iHoursSum;
        this.lstDataRows[index].nvDate = event.dtDate.toLocaleDateString();
      }
      debugger;
      this.cc.refreshTable(this.lstDataRows);
      this.presence = null;

    }
    else
      this.presence = null;
  }

}
