import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-image',
  templateUrl: './show-image.component.html',
  styleUrls: ['./show-image.component.css']
})
export class ShowImageComponent implements OnInit {

  constructor() { }
protected name:string="ונתנו ידידים";
protected listImage:object={};
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

}
