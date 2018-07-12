import { Component, OnInit } from '@angular/core';
import { AppProxy } from '../../services/app.proxy';
// import { Avrech } from '../../classes/avrech';

@Component({
  selector: 'app-avrechim',
  templateUrl: './avrechim.component.html',
  styleUrls: ['./avrechim.component.css']
})
export class AvrechimComponent implements OnInit {

  // avrechimList:Avrech[];
  constructor(private appProxy:AppProxy) { }

  ngOnInit() {
    // this.appProxy.post("GetAllAvrechim",{iPersonId:1}).then(
    //   data=>alert("ssucces!!"),
    //   err=>("err")
    // );
    // this.appProxy.get("GetAllAvrechim?iPersonId=1")
    // .then(
    //   data=>{
    //   alert("success")
    //    }).catch(err=>{
    //      alert("err");
    //    });
  }

}
