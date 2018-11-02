import { Component, OnInit, ViewChild, Output, Input } from '@angular/core';
import { AppProxy } from '../../services/app.proxy';
import { ActivatedRoute } from '@angular/router';
import { SysTableService } from '../../services/sys-table.service';
import { VyTableColumn } from '../../templates/vy-table/vy-table.classes';
import { PresenceAvrech } from '../../classes/presenceAvrech';
import { VyTableComponent } from '../../templates/vy-table/vy-table.component';

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
  @Output()
  @Input()
  presence:PresenceAvrech;
  @ViewChild(VyTableComponent) cc:VyTableComponent;
  constructor(private appProxy: AppProxy, private router: ActivatedRoute, private sysTableService: SysTableService) { }

  public lstColumns = [
    new VyTableColumn('עריכה', 'edit', 'html', true, false),
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
        })
      })
      // this.PA = data;
      // alert(data.length);

    })

  }


  editPresence(p: PresenceAvrech) {
    debugger;
     this.presence = p;
    // this.presences.forEach(element => {
    //   if (element.iPresenceAvrech == p.iPresenceAvrech) {
    //     this.presence = new PresenceAvrech();
    //     this.presence.iPersonId = element.iPersonId;
    //     this.presence.iHoursSum = element.iHoursSum;
    //     this.presence.dtDatePresence=element.dtDatePresence;
    //   }
    // })
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
          ['nvDate']: new Date().toLocaleDateString(),
          // dtDatePresence:this.presence.dtDatePresence,
          iHoursSum: event.iHoursSum,
          edit: '<div class="edit"></div>',
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
