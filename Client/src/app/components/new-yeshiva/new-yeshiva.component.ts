import { Component, OnInit } from '@angular/core';
import { AppProxy } from '../../services/app.proxy';
import { Yeshiva } from '../../classes/Yeshiva';

@Component({
  selector: 'app-new-yeshiva',
  templateUrl: './new-yeshiva.component.html',
  styleUrls: ['./new-yeshiva.component.css']
})
export class NewYeshivaComponent implements OnInit {

  protected nvYeshivaName:Yeshiva = new Yeshiva();
  protected nvAddress:Yeshiva = new Yeshiva();
  protected nvCity:Yeshiva = new Yeshiva();
  protected nvContact:Yeshiva = new Yeshiva();
  protected nvMobile:Yeshiva = new Yeshiva();
  protected nvEmail:Yeshiva = new Yeshiva();

  protected yeshiva: Yeshiva = new Yeshiva();

  constructor(private appProx: AppProxy) { }


  ngOnInit() {
  }

  save() {
    this.appProx.post('AddYeshiva', { yeshiva: this.yeshiva })
      .then(
        data => {
          if(this.nvYeshivaName!=null&&this.nvAddress!=null&&this.nvCity!=null&&this.nvContact!=null&&
            this.nvEmail!=null&&this.nvMobile!=null){
            this.yeshiva = data;
            alert("Good");
          }
          else {
            alert("Not good")
          }
        })
  }
}
