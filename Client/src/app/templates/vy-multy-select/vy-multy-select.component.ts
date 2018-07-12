import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-vy-multy-select',
  templateUrl: './vy-multy-select.component.html',
  styleUrls: ['./vy-multy-select.component.css']
})
export class VyMultySelectComponent implements OnInit {

  constructor() { }
  @Input()
  @Output()
  myList:string[]=["aaa","bbb","ccc","ddd","eee"];

  ngOnInit() {
  }

}
