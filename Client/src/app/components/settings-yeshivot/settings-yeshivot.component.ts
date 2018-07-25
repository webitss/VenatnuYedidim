import { Component, OnInit, OnDestroy } from '@angular/core';
import { NewYeshivaComponent } from '../new-yeshiva/new-yeshiva.component';
import { Yeshiva } from '../../classes/Yeshiva';
import { RouterLink } from '@angular/router';
import { AppProxy } from '../../services/app.proxy';

@Component({
  selector: 'app-settings-yeshivot',
  templateUrl: './settings-yeshivot.component.html',
  styleUrls: ['./settings-yeshivot.component.css']
})


export class SettingsYeshivotComponent implements OnInit {

  
  constructor(private appProxy:AppProxy) { }
  protected yeshivaList:Yeshiva;
  protected yeshiva:Yeshiva;  

  ngOnInit() {
    this.appProxy.post("GetAllYeshivot").then(data=>this.yeshivaList=data,err=>alert(err));

    if(this.yeshiva==null)
      this.yeshiva=new Yeshiva();
  }
}
