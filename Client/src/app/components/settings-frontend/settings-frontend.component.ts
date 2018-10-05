import { Component, OnInit } from '@angular/core';
import { TGlobalParameters } from '../../classes/TGlobalParameters';
import { settingsFrontend } from '../../services/settings-frontend.service';

@Component({
  selector: 'app-settings-frontend',
  templateUrl: './settings-frontend.component.html',
  styleUrls: ['./settings-frontend.component.css']
})
export class SettingsFrontendComponent implements OnInit {
 private GlobalParameters:TGlobalParameters[]=new Array<TGlobalParameters>();
  
  constructor(private settingsFrontend:settingsFrontend) { }
 
  ngOnInit() {
   
  }
private saveGlobalParams(){
 
  this.settingsFrontend.GlobalHeader.nvTitle="כותרת";
  this.settingsFrontend.GlobalHeader.iParameterId=1
  this.GlobalParameters.push(this.settingsFrontend.GlobalHeader);
  this.settingsFrontend.GlobalVerMarch.nvTitle="טקט ראשי ";
  this.settingsFrontend.GlobalVerMarch.iParameterId=2
  this.GlobalParameters.push(this.settingsFrontend.GlobalVerMarch);
  this.settingsFrontend.GlobalMarchSF.nvTitle="טקסט משני";
  this.settingsFrontend.GlobalVerMarch.iParameterId=3
  this.GlobalParameters.push(this.settingsFrontend.GlobalMarchSF);

  if(this.settingsFrontend.GetGlobalParameters()){
  this.settingsFrontend.updateGlobalParameters(this.GlobalParameters).then(

    l=>alert("udp"));
  }
  else
this.settingsFrontend.SaveGlobalParameters(this.GlobalParameters).then(

  l=>alert("ins"));
}
}
