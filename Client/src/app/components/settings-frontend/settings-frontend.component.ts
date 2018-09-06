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
 
  this.settingsFrontend.GlobalHeader.nvValue="כותרת";
  this.GlobalParameters.push(this.settingsFrontend.GlobalHeader);
  this.settingsFrontend.GlobalVerMarch.nvValue="טקט ראשי ";
  this.GlobalParameters.push(this.settingsFrontend.GlobalVerMarch);
  this.settingsFrontend.GlobalMarchSF.nvValue="טקסט משני";
  this.GlobalParameters.push(this.settingsFrontend.GlobalMarchSF);
  
this.settingsFrontend.SaveGlobalParameters(this.GlobalParameters).then(l=>alert(l));
}
}
