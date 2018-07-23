import { Component, OnInit } from '@angular/core';
import { AppProxy } from '../../services/app.proxy';
import { Yeshiva } from '../../classes/Yeshiva';
import { forEach } from '@angular/router/src/utils/collection';
import { element } from 'protractor';
import { EMLINK } from 'constants';
import { SettingsYeshivotComponent } from '../settings-yeshivot/settings-yeshivot.component';

@Component({
  selector: 'app-new-yeshiva',
  templateUrl: './new-yeshiva.component.html',
  styleUrls: ['./new-yeshiva.component.css']
})
export class NewYeshivaComponent implements OnInit {

  protected yeshiva: Yeshiva = new Yeshiva();

  constructor(private appProx: AppProxy) { }


  ngOnInit() {
  }

  save() {
    this.appProx.post('AddYeshiva', { yeshiva: this.yeshiva })
      .then(
        data => {
          {
            this.yeshiva = data;
            // path:"settings/:settings-yeshivot";
          }
        })
  }

  close() {
    // path:"settings/:settings-yeshivot";
  }

  edit() {
    this.appProx.post('EditYeshiva',{yeshiva:this.yeshiva});
  }
}
