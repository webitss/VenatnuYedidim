import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vy-table',
  templateUrl: './vy-table.component.html',
  styleUrls: ['./vy-table.component.css']
})
export class VyTableComponent implements OnInit {

  private lstColumns = [{
    title: 'a',
    filter: '',
    name: 'aa',
    titleStyle: {
      width: '25%',
      color: 'red'
    },
    filterStyle: {
      width: '25%'
    },
    cellStyle: {
      width: '25%',
      background: 'red'
    }
  },
  {
    title: 'b',
    filter: '',
    name: 'bb',
    titleStyle: {
      width: '25%',
      color: 'red'
    },
    filterStyle: {
      width: '25%'
    },
    cellStyle: {
      width: '25%',
      background: 'red'
    }
  },
  {
    title: 'c',
    filter: '',
    name: 'cc',
    titleStyle: {
      width: '25%',
      color: 'red'
    },
    filterStyle: {
      width: '25%'
    },
    cellStyle: {
      width: '25%',
      background: 'red'
    }
  },
  {
    title: 'd',
    filter: '',
    name: 'dd',
    titleStyle: {
      width: '25%',
      color: 'red'
    },
    filterStyle: {
      width: '25%'
    },
    cellStyle: {
      width: '25%',
      background: 'red'
    }
  }]
  private lstDataRows = [{
    aa: 'aaa',
    bb: 'bbb',
    cc: 'ccc',
    dd: 'ddd',
  }]

  constructor() { }

  ngOnInit() {

  }

}
