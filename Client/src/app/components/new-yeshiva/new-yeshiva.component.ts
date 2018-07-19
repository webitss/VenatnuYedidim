import { Component, OnInit } from '@angular/core';
import { AppProxy } from '../../services/app.proxy';
import { Yeshiva } from '../../classes/Yeshiva';

@Component({
  selector: 'app-new-yeshiva',
  templateUrl: './new-yeshiva.component.html',
  styleUrls: ['./new-yeshiva.component.css']
})
export class NewYeshivaComponent implements OnInit {

 protected yeshiva: Yeshiva = new Yeshiva();

  constructor(private appProx: AppProxy) { }


  ngOnInit() {
  }

  save() {
    this.appProx.post('AddYeshiva', { yeshiva: this.yeshiva })
      .then(
        data => {
          if(this.yeshiva!=null){
            this.yeshiva = data;
          }
          alert("good");
        }).catch(err => {
          alert("Error, there is null");
        });
  }
}
