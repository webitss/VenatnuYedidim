import { Component, OnInit } from '@angular/core';
import { AppProxy } from '../../services/app.proxy';
import { Yeshiva } from '../../classes/Yeshiva';

@Component({
  selector: 'app-new-yeshiva',
  templateUrl: './new-yeshiva.component.html',
  styleUrls: ['./new-yeshiva.component.css']
})
export class NewYeshivaComponent implements OnInit {

  yeshiva1:Yeshiva=new Yeshiva(); 

  constructor(private appProx:AppProxy,private yeshiva:Yeshiva) { }
 
  

  ngOnInit() {
  }

  save(yeshiva1) {
   
    this.appProx.post('AddYeshiva',{yeshiva:yeshiva1});
  }
}
