import { Component, OnInit } from '@angular/core';
import { TGlobalParameters } from '../../classes/TGlobalParameters';

@Component({
  selector: 'app-settings-frontend',
  templateUrl: './settings-frontend.component.html',
  styleUrls: ['./settings-frontend.component.css']
})
export class SettingsFrontendComponent implements OnInit {

  constructor() { }
 private GlobalHeader:TGlobalParameters=new TGlobalParameters();
 private GlobalVerMarch:TGlobalParameters=new TGlobalParameters();
  private GlobalMarchSF:TGlobalParameters=new TGlobalParameters();
  ngOnInit() {
   
  }
private saveGlobalParams(){

}
}
