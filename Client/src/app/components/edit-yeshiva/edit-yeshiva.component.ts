import { Component, OnInit, Output, Input } from '@angular/core';
import { Yeshiva } from '../../classes/Yeshiva';
import { EventEmitter } from 'events';
import { AppProxy } from '../../services/app.proxy';

@Component({
  selector: 'app-edit-yeshiva',
  templateUrl: './edit-yeshiva.component.html',
  styleUrls: ['./edit-yeshiva.component.css']
})
export class EditYeshivaComponent implements OnInit {

  constructor(private appProxy:AppProxy) { }

  @Output() Yeshiva=new EventEmitter();

  @Output()
  @Input()
  protected yeshiva:Yeshiva;


  close(){
    this.Yeshiva.emit(null);
  }
  
  edit() {
    this.appProxy.post('EditYeshiva',{yeshiva:this.yeshiva});
    this.Yeshiva.emit(null);
  }

  ngOnInit() {
  }
}
