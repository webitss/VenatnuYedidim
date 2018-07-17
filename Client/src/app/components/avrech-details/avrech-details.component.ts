import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppProxy } from '../../services/app.proxy';
import { Avrech } from '../../classes/avrech';
import{BehaviorSubject} from'rxjs/BehaviorSubject'

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
    debugger;

  }

  save()
  {
    this.appProxy.post("UpdateAvrech",{avrech:this.avrech,iUserId:1}).then(
      data=>
      {
        if(data==true)
    alert("העדכון הצליח");
    else
    alert("העדכון נכשל")
    },
      err=>("err")
    );
  }

}
