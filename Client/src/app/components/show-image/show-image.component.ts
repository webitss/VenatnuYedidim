import { Component, OnInit } from '@angular/core';
import { AppProxy } from '../../services/app.proxy';

@Component({
  selector: 'app-show-image',
  templateUrl: './show-image.component.html',
  styleUrls: ['./show-image.component.css']
})
export class ShowImageComponent implements OnInit {

  constructor() { }
protected titaieName:string="ונתנו ידידים";

protected divModal:boolean;

protected listImage:string[]=["Background_Cliffhouse.jpg","Background_ForwardDirection_DeskScale.jpg","Background_ForwardDirection_RoomScale.jpg",
"Background_RoomSetupDisambig.jpg","Background_RoomSetupDisambig_DeskScale.jpg","Background_RoomTracing_02.jpg"];
protected password:string;
protected name:string
protected lstColumns = [{
 
  title: 'ערך',
  type: 'html',
 
},
{
  title: 'ערך',
  type: 'html',
},
{
  title: 'ערך',
  type: 'html',
},
]
  ngOnInit() {
  }
  get baseFileUrl(){
    return AppProxy.getBaseUrl()+'Files/';
  }
  
}
