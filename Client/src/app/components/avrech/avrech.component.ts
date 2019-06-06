import { Component, OnInit, Output, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AvrechDetailsComponent } from '../avrech-details/avrech-details.component'
import { AppProxy } from '../../services/app.proxy';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { VyTableComponent } from '../../templates/vy-table/vy-table.component';
import { Avrech } from '../../classes/avrech';
import { NgForm } from '@angular/forms';
import { GlobalService } from '../../services/global.service';


@Component({
  selector: 'app-avrech',
  templateUrl: './avrech.component.html',
  styleUrls: ['./avrech.component.css']
})
export class AvrechComponent implements OnInit {

  public currentComponent: any;




  constructor(private activatedRoute: ActivatedRoute, private router: Router, private appProxy: AppProxy,private globalService:GlobalService) {
  }
  @ViewChild(NgForm) form;

  name: string;
  id: number;
  avrech: Avrech;
  ngOnInit() {
    debugger;
    this.id = this.activatedRoute.snapshot.params["iPersonId"];

    
    if (this.id != 0) {

      this.appProxy.post("GetAvrechById", { iPersonId: this.id }).then(
        data => {

          this.avrech = data;
          this.name = this.avrech.nvFirstName+" "+this.avrech.nvLastName;
this.globalService.avrech=this.avrech;
// alert(this.globalService.getAvrech().iPersonId);
        },
        err => ("err")
      );

    }
    else {
      this.name = "אברך חדש";
    }
    debugger;
   

  }
  onRouterOutletActivate(event) {

    this.currentComponent = event;
  }


  get isDisabled(): boolean {
    debugger;
    if (this.currentComponent.form != undefined)
    {
      var f=this.currentComponent.form.valid;
      // alert(f+"if");
      return f;
    }
    else
    {
      // alert("else");
      return false;
    }
  }

  save() {
    debugger;
    if (this.currentComponent.save) {
      debugger;
      this.currentComponent.save()
     this.router.navigateByUrl("/avrechim");
    }
  }

  close() {
    this.router.navigate(["avrechim"]);
  }
}

