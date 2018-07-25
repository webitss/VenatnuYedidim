import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { AppProxy } from '../../services/app.proxy';
import { Yeshiva } from '../../classes/Yeshiva';
import { forEach } from '@angular/router/src/utils/collection';
import { element } from 'protractor';
import { EMLINK } from 'constants';
import { SettingsYeshivotComponent } from '../settings-yeshivot/settings-yeshivot.component';

@Component({
  selector: 'app-setting-yeshiva',
  templateUrl: './setting-yeshiva.component.html',
  styleUrls: ['./setting-yeshiva.component.css']
})

export class SettingYeshivaComponent implements OnInit {

  @Output() Yeshiva=new EventEmitter();

  
  @Input()
  public iYeshivaId: number;
  
  protected yeshiva: Yeshiva = new Yeshiva();

  constructor(private appProxy: AppProxy) { }

  save() {
    this.appProxy.post('AddYeshiva', { yeshiva: this.yeshiva })
      .then(
        data => {
          {
            this.yeshiva = data;
            this.Yeshiva.emit(null);
          }
        })
  }

  edit() {
    this.appProxy.post('EditYeshiva',{yeshiva:this.yeshiva});
    this.Yeshiva.emit(null);
  }

  close(){

  }

  ngOnInit() {
  }
}
