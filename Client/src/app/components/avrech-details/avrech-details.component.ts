import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppProxy } from '../../services/app.proxy';
import { Avrech } from '../../classes/avrech';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { GlobalService } from '../../services/global.service';

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
  isDetails: boolean;
  constructor(private activatedRoute: ActivatedRoute, private appProxy: AppProxy, private globalService: GlobalService) { }

  ngOnInit() {
    this.activatedRoute.parent.params.subscribe(params => {
      this.id = params['iPersonId'];
      //alert(this.id);
      if (this.id != 0) {
        this.isDetails = true;
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
        this.isDetails = false;
        this.avrech = new Avrech();
      }
    });
  }



  save() {
    this.appProxy.post("UpdateAvrech", { avrech: this.avrech, iUserId: this.globalService.getUser()['iUserId'] }).then(
    );
  }

}
