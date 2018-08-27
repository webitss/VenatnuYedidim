import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { AppProxy } from '../../services/app.proxy';
import { Yeshiva } from '../../classes/Yeshiva';
import {ActivatedRoute,Router, ROUTER_CONFIGURATION} from '@angular/router'
// import { forEach } from '@angular/router/src/utils/collection';
// import { element } from 'protractor';
// import { EMLINK } from 'constants';
import { SettingsYeshivotComponent } from '../settings-yeshivot/settings-yeshivot.component';
import { SysTableRow } from '../../classes/SysTableRow';

@Component({
  selector: 'app-setting-yeshiva',
  templateUrl: './setting-yeshiva.component.html',
  styleUrls: ['./setting-yeshiva.component.css']
})

export class SettingYeshivaComponent implements OnInit {
  
  @Output() 
  public closeYeshiva=new EventEmitter();

  @Input()
  public iYeshivaId: number;

  @Input()
  protected sysTableList:SysTableRow[];

  protected yeshiva:Yeshiva=new Yeshiva();

  constructor(private appProxy: AppProxy,private ActivatedRoute:ActivatedRoute,private router:Router) { }

  ngOnInit() {
    if(this.iYeshivaId == 0)
      this.yeshiva = new Yeshiva();
    else
      this.appProxy.post('getYeshivaById',{iYeshivaId:this.iYeshivaId})
      .then(
        data=>{
          this.yeshiva=data;
        }
      );
  }

  cancel() {
    this.closeYeshiva.emit(null);
  }

  save() {
    if(this.yeshiva.iYeshivaId==0){
       this.appProxy.post('AddYeshiva', { yeshiva: this.yeshiva })
      .then(
        data => {
            this.yeshiva = data;
            this.closeYeshiva.emit(null);
            alert("נשמר בהצלחה");
        })
    }
    else{
      this.appProxy.post('EditYeshiva',{yeshiva:this.yeshiva,iYeshivaId:this.yeshiva.iYeshivaId})
      .then(
        data=> {
          this.yeshiva=data;
          this.closeYeshiva.emit(null);
          alert("נשמר בהצלחה");
        } 
      )
    }
  }
}
