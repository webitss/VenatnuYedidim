import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { VyTableColumn } from './vy-table.classes';

@Component({
  selector: 'app-vy-table',
  templateUrl: './vy-table.component.html',
  styleUrls: ['./vy-table.component.css']
})
export class VyTableComponent implements OnInit {

  @Input()
  public lstColumns: Array<VyTableColumn> = new Array<VyTableColumn>();
  @Input()
  public lstDataRows: Array<any> = new Array<any>();
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
