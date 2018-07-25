import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-vy-table',
  templateUrl: './vy-table.component.html',
  styleUrls: ['./vy-table.component.css']
})
export class VyTableComponent implements OnInit {

  @Input()
  public lstColumns = [];
  // public lstColumns = [{
  //   title: 'עריכה',
  //   filter: '',
  //   name: 'aa',
  //   // titleStyle: {
  //   //   width: '25%',
  //   //   color: 'red'
  //   // },
  //   // filterStyle: {
  //   //   width: '25%'
  //   // },
  //   // cellStyle: {
  //   //   width: '25%',
  //   //   background: 'red'
  //   // }
  // },
  // {
  //   title: 'שם פרטי',
  //   filter: '',
  //   name: 'bb',
  //   // titleStyle: {
  //   //   width: '25%',
  //   //   color: 'red'
  //   // },
  //   // filterStyle: {
  //   //   width: '25%'
  //   // },
  //   // cellStyle: {
  //   //   width: '25%',
  //   //   background: 'red'
  //   // }
  // }]

  @Input()
  public lstDataRows = [];
  // public lstDataRows = [{
  //   aa: 1,
  //   bb: 'aaa1',
  //   cc: 'aaa1',
  //   dd: 'aaa1',
  // }]

  @Output()
  public clickCell: EventEmitter<any> = new EventEmitter<any>();

  private lstOrderByFields: Array<any>

  constructor() {
    this.lstOrderByFields = new Array<any>();
    // this.lstOrderByFields.push({'aa': 'number'})
    // this.lstOrderByFields.push('-bb')
  }

  clickCellFunc(item) {
    this.clickCell.emit(item);
  }


  ngOnInit() {

  }

}
