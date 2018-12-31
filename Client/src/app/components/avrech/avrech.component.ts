import { Component, OnInit, Output, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AvrechDetailsComponent } from '../avrech-details/avrech-details.component'
import { AppProxy } from '../../services/app.proxy';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { VyTableComponent } from '../../templates/vy-table/vy-table.component';
import { Avrech } from '../../classes/avrech';


@Component({
  selector: 'app-avrech',
  templateUrl: './avrech.component.html',
  styleUrls: ['./avrech.component.css']
})
export class AvrechComponent implements OnInit {

  public currentComponent: any;




  constructor(private activatedRoute: ActivatedRoute,private router: Router, private appProxy: AppProxy) {
  }

  name: string;
  id:number;
  avrech:Avrech;
  ngOnInit() {
     this.id = this.activatedRoute.snapshot.params["iPersonId"];
    
      //alert(this.id);
      if (this.id != 0) {
       
        this.appProxy.post("GetAvrechById", { iPersonId: this.id }).then(
          data => {
            this.avrech = data;
            this.name = this.avrech['lstObject']['nvUserName'];
           
          },
          err => ("err")
        );

      }
      else {
        this.name="";
      }

  }
  onRouterOutletActivate(event) {
    this.currentComponent = event;
  }

  
  isDisabled():boolean {
    if(this.currentComponent.form!=undefined) {
      return this.currentComponent.form.valid;
  }
}

  save() {
    if (this.currentComponent.save) {
      this.currentComponent.save();
    }
  }

  close() {
    this.router.navigate(["avrechim"]);
  }
}

