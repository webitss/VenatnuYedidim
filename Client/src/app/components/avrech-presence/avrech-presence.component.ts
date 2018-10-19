import { Component, OnInit, ViewChild } from '@angular/core';
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
  presence:PresenceAvrech;
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
loadPresences(){
  this.appProxy.post('GetPresenceAvrechById', { iPersonId: this.iPersonId }).then(res => {
    this.presences=res;
    this.presences.forEach(p => {
      this.lstDataRows.push({
        iPersonId: p.iPersonId,
        iPresenceAvrech: p.iPresenceAvrech,
        ['nvDate']: p.dtDatePresence.toLocaleDateString(),
        dtDatePresence:p.dtDatePresence,
        iHoursSum: p.iHoursSum,
        edit: '<div class="edit"></div>',
      })
    })
    // this.PA = data;
    // alert(data.length);
  })
}
  @ViewChild(VyTableComponent) cc:VyTableComponent;

  editPresence(p:PresenceAvrech) {
debugger;
this.presence=p;

    // this.cc.refreshTable(this.presences)

}
addPresence() {
  this.presence = new PresenceAvrech();
  this.presence.dtDatePresence=new Date();
  this.presence.iPersonId = this.iPersonId;
}
closePresenceDialog(save) {
  if (save == true) {
    this.lstDataRows = new Array();
    this.loadPresences();
  }
  this.presence = null;
}
openPresence(){
  throw new Error("Method not implemented.");
}
}
