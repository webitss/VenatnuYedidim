import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppProxy } from '../../services/app.proxy';
import { Avrech } from '../../classes/avrech';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

@Component({
  selector: 'app-avrech-details',
  templateUrl: './avrech-details.component.html',
  styleUrls: ['./avrech-details.component.css']
})
export class AvrechDetailsComponent implements OnInit {


  id: number;
  avrech: Avrech;
  userName: string;
  password: string;
  constructor(private activatedRoute: ActivatedRoute, private appProxy: AppProxy) { }

  ngOnInit() {
    this.activatedRoute.parent.params.subscribe(params => {
      this.id = params['iPersonId'];

      if (this.id != 0) {
        this.appProxy.post("GetAvrechById", { iPersonId: this.id }).then(
          data => {
            this.avrech = data;
            this.userName = this.avrech['lstObject']['nvUserName'];
            this.password = this.avrech['lstObject']['nvPassword'];
            this.avrech['lstObject'] = [];
          },
          err => ("err")
        );

      }
      else {
        this.avrech = new Avrech();
      }
    });
  }



  save() {
    this.appProxy.post("UpdateUserNameAndPassword", { iPersonId: this.avrech.iPersonId, nvUserName: this.userName, nvPassword: this.password, iUserId: 1 }).then(
      data => {
        this.appProxy.post("UpdateAvrech", { avrech: this.avrech, iUserId: 1 }).then(
        );
      }
    );

  }

}
