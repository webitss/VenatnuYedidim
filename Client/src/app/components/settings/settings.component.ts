import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { SysTableService } from '../../services/sys-table.service'

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(public globalService:GlobalService) { }
  public currentComponent:any;
  private iPersonId:number;
  public id:number;
  ngOnInit() {
  }
  onRouterOutletActivate(event) {

    if(!this.id)
    {
      this.currentComponent = event;
    }

  }
  close()
  {

  }
  save()
  {

  }
}
