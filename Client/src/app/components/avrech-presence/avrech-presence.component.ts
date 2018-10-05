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

  private sub:any;
  private iPersonId:number;
  protected PA:PresenceAvrech;
  constructor(private appProxy: AppProxy, private router: ActivatedRoute, private sysTableService: SysTableService) { }

  public lstColumns = [
    new VyTableColumn('עריכה', 'edit', 'html', true,false),
    new VyTableColumn('תאריך','dtDatePresence'),
    new VyTableColumn('סך שעות','dtDatePresence')
  ];
      public lstDataRows = [];
    

  ngOnInit() {
    this.sub = this.router.parent.params.subscribe(params => {
      this.iPersonId = +params["iPersonId"];
      alert(this.iPersonId);
      debugger;
      this.appProxy.post('GetPresenceAvrechById', { iPresenceAvrech: this.iPersonId }).then(data => {
        this.PA = data;
      })
  });
}

}

