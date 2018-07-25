export class VyTableColumn {

  public title: string;
  public filter: string;
  public name: string;
  public type: string;
  public clickCell: boolean;
  public titleStyle: any;
  public filterStyle: any;
  public cellStyle: any;

  constructor(_title: string, _filter: string, _name: string, _type: string, _clickCell: boolean = false,
    _titleStyle: any = {}, _filterStyle: any = {}, _cellStyle: any = {}) {
    this.title = _title;
    this.filter = _filter;
    this.name = _name;
    this.type = _type;
    this.clickCell = _clickCell;
    this.titleStyle = _titleStyle;
    this.filterStyle = _filterStyle;
    this.cellStyle = _cellStyle;
  }

}
