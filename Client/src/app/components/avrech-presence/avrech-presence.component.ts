import { Component, OnInit } from '@angular/core';
import { AppProxy } from '../../services/app.proxy';
import { ActivatedRoute } from '@angular/router';
import { SysTableService } from '../../services/sys-table.service';
import { VyTableColumn } from '../../templates/vy-table/vy-table.classes';
import { PresenceAvrech } from '../../classes/presenceAvrech';

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
      this.appProxy.post('GetPresenceAvrechById', { iPersonId: this.iPersonId }).then(res => {
        this.presences=res;
        this.presences.forEach(p => {
          this.lstDataRows.push({
            iPersonId: p.iPersonId,
            iPresenceAvrech: p.iPresenceAvrech,
            ['nvDate']: p.dtDatePresence.toLocaleDateString(),
            // dtDatePresence:p.dtDatePresence,
            iHoursSum: p.iHoursSum,
            edit: '<div class="edit"></div>',
          })
        })
        // this.PA = data;
        // alert(data.length);
      })
    });
  }
  click(e) {
    // debugger;
    // this.iPersonId = e.iPersonId;
    // if (e.columnClickName == "edit")
    //   this.editPresence();

  }
  editPresence(e) {
    debugger;
    this.presences.forEach(element => {
      if (element.iPresenceAvrech == e.presenceAvrech) {
        alert(this.presence.iHoursSum);
        this.presence = new PresenceAvrech();
        this.presence.dtDatePresence = element.dtDatePresence;
        this.presence.iHoursSum = element.iHoursSum;
      }
    });
    
}


}
