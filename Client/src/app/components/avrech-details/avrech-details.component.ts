import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppProxy } from '../../services/app.proxy';
import { Avrech } from '../../classes/avrech';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { GlobalService } from '../../services/global.service';
import { VyTableComponent } from '../../templates/vy-table/vy-table.component';
import { NgForm } from '../../../../node_modules/@angular/forms';
import { AppComponent } from '../app/app.component';
import { ParentChildService } from '../../services/parent-child.service';

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
  change: boolean;
  @ViewChild(NgForm) form;
  constructor(private activatedRoute: ActivatedRoute,private _sharedService: ParentChildService, private appProxy: AppProxy, private globalService: GlobalService, private router: Router, private _parent: AppComponent) { }

  ngOnInit() {
    this.activatedRoute.parent.params.subscribe(params => {
      this.id = params['iPersonId'];
     debugger;
      if (this.id != 0) {
        this.isDetails = true;
        debugger;
        this.appProxy.post("GetAvrechById", { iPersonId: this.id }).then(

          data => {
            debugger;
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
  Change(){
    debugger;
    this.change=true;
    this._sharedService.emitChange();
   }

  save() {
    this.appProxy.post("UpdateAvrech", { avrech: this.avrech, iUserId: this.globalService.getUser()['iUserId'] }).then(res=>
      {debugger;
        this._parent.openMessagePopup("השמירה התבצעה בהצלחה!")
    this.change=false;
  });
  
  }
 
  ngOnDestroy() {
    if (this.change) {
      let v = confirm("האם ברצונך לשמור?");
      if (v)
      {
        debugger;
        this.save();
  

      }
    }

  }
}
    