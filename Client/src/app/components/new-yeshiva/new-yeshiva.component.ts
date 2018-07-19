import { Component, OnInit } from '@angular/core';
import { AppProxy } from '../../services/app.proxy';
import { Yeshiva } from '../../classes/Yeshiva';
import { forEach } from '@angular/router/src/utils/collection';
import { element } from 'protractor';
import { EMLINK } from 'constants';

@Component({
  selector: 'app-new-yeshiva',
  templateUrl: './new-yeshiva.component.html',
  styleUrls: ['./new-yeshiva.component.css']
})
export class NewYeshivaComponent implements OnInit {

  protected nvYeshivaName:Yeshiva;
  protected nvAddress:Yeshiva;
  protected nvCity:Yeshiva;
  protected nvContact:Yeshiva;
  protected nvMobile:Yeshiva;
  protected nvEmail:Yeshiva;

  protected yeshiva: Yeshiva = new Yeshiva();

  constructor(private appProx: AppProxy) { }


  ngOnInit() {
  }

  save() {
    this.appProx.post('AddYeshiva', { yeshiva: this.yeshiva })
      .then(
        data => {
          if(
            // this.yeshiva!=null 
             //&&
             this.nvYeshivaName!=null
             &&this.nvAddress!=null
             &&this.nvCity!=null
             &&this.nvContact!=null
             &&this.nvMobile!=null
             &&this.nvEmail!=null
        ){
            this.yeshiva = data;
            alert("Good");
          }
          else {
            alert("Not good")
          }
        })
  }
}
