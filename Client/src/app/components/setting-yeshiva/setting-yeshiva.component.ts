import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { AppProxy } from '../../services/app.proxy';
import { Yeshiva } from '../../classes/Yeshiva';
import {ActivatedRoute,Router} from '@angular/router'
// import { forEach } from '@angular/router/src/utils/collection';
// import { element } from 'protractor';
// import { EMLINK } from 'constants';
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

  constructor(private appProxy: AppProxy,private ActivatedRoute:ActivatedRoute,private router:Router) { }

  ngOnInit() {
    this.ActivatedRoute.parent.params.subscribe(params=>{
      this.iYeshivaId=params['iYeshivaId'];
      alert(this.iYeshivaId);
    })
    this.appProxy.post('getYeshivaById',{iYeshivaId:this.yeshiva})
     .then(
       data=>{
         this.yeshiva=data;
       }
     ),
     err=>("err");
  }


  save() {
    if(this.iYeshivaId==0){
       this.appProxy.post('AddYeshiva', { yeshiva: this.yeshiva })
      .then(
        data => {
          {
            this.yeshiva = data;
            this.Yeshiva.emit(null);
            alert("נשמר בהצלחה");
          }
        })
    }
    else{
      this.appProxy.post('EditYeshiva',{yeshiva:this.yeshiva,iYeshivaId:this.yeshiva})
      .then(
        data=>{
        this.Yeshiva.emit(null);
        alert("נשמר בהצלחה");
        }
      )
    }
  }

  close(){
  this.router.navigate(["settings-yeshivot"]);
  }
}
