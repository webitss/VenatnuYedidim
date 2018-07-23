import { Component, OnInit, Output, Input } from '@angular/core';

@Component({
  selector: 'app-vy-table',
  templateUrl: './vy-table.component.html',
  styleUrls: ['./vy-table.component.css']
})
export class VyTableComponent implements OnInit {

  @Input()
  public lstColumns=[];
  // public lstColumns = [{
  //   title: 'עריכה',
  //   filter: '',
  //   name: 'aa',
  //   titleStyle: {
  //     width: '25%',
  //     color: 'red'
  //   },
  //   filterStyle: {
  //     width: '25%'
  //   },
  //   cellStyle: {
  //     width: '25%',
  //     background: 'red'
  //   }
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
  // },
  // {
  //   title: 'שם משפחה',
  //   filter: '',
  //   name: 'cc',
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
  //   title: 'נייד',
  //   filter: '',
  //   name: 'dd',
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
  public lstDataRows =[];
  // public lstDataRows = [{
  //   aa: 1,
  //   bb: 'aaa1',
  //   cc: 'aaa1',
  //   dd: 'aaa1',
  // },
  // {
  //   aa: 1,
  //   bb: 'bbb3',
  //   cc: 'bbb2',
  //   dd: 'bbb2',
  // },
  // {
  //   aa: 1,
  //   bb: 'ccc2',
  //   cc: 'ccc4',
  //   dd: 'ccc3',
  // },
  // {
  //   aa: 1,
  //   bb: 'ddd4',
  //   cc: 'ddd4',
  //   dd: 'ddd4',
  // },
  // {
  //   aa: 5,
  //   bb: 'eee5',
  //   cc: 'eee5',
  //   dd: 'eee5',
  // }]

  private lstOrderByFields: Array<any>

  constructor() {
    this.lstOrderByFields = new Array<any>();   
    // this.lstOrderByFields.push({'aa': 'number'})
    // this.lstOrderByFields.push('-bb')
  }

  ngOnInit() {

  }

}
