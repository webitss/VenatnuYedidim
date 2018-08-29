import { Component, OnInit,Output,Input,EventEmitter } from '@angular/core';
import { AppProxy } from '../../services/app.proxy';
import { Yeshiva } from '../../classes/Yeshiva';

@Component({
  selector: 'app-setting-yeshiva-delete',
  templateUrl: './setting-yeshiva-delete.component.html',
  styleUrls: ['./setting-yeshiva-delete.component.css']
})
export class SettingYeshivaDeleteComponent implements OnInit {

  @Output() 
  public closeYeshiva=new EventEmitter();
  
  @Input()
  protected iYeshivaId:number;

  protected yeshiva:Yeshiva;
  protected iLastModifyUserId:number;

  constructor(private appProxy:AppProxy) { }

  ngOnInit() {
  }

  delete() {
    // this.iYeshivaId=null;
    this.appProxy.post('DeleteYeshiva',{iYeshivaId:this.iYeshivaId,iLastModifyUserId:this.iLastModifyUserId})
    .then(
        data=>{
        this.yeshiva=data;
        alert("הישיבה נמחקה בהצלחה");
    });    
    this.closeYeshiva.emit(null);
  }
}
