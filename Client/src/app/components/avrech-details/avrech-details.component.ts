import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppProxy } from '../../services/app.proxy';
import { Avrech } from '../../classes/avrech';

@Component({
  selector: 'app-avrech-details',
  templateUrl: './avrech-details.component.html',
  styleUrls: ['./avrech-details.component.css']
})
export class AvrechDetailsComponent implements OnInit {

  id:number;
  avrech:Avrech;
  constructor(private activatedRoute: ActivatedRoute ,private appProxy:AppProxy) { }

  ngOnInit() {
    debugger;
    this.activatedRoute.parent.params.subscribe(params => {
      this.id=params['iPersonId'];
    })   

    this.appProxy.post("GetAvrechById",{iPersonId:this.id}).then(
      data=>
      {
    this.avrech=data;
    
    },
      err=>("err")
    );
  }

  save()
  {
    debugger;
    this.appProxy.post("UpdateAvrech",{avrech:this.avrech}).then(
      data=>
      {
    alert("העדכון הצליח");
    },
      err=>("err")
    );
  }

}
