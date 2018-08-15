export class VyTableColumn {

  public title: string;
  public filter: string;
  public name: string;
  public type: string;
  public bClickCell: boolean;
  public bExcel: boolean;
  public titleStyle: any;
  public filterStyle: any;
  public cellStyle: any;

  constructor(_title: string, _name: string, _type?: string, _bClickCell: boolean = false, _bExcel: boolean = true,
    _filter: string = '', _titleStyle: any = {}, _filterStyle: any = {}, _cellStyle: any = {}) {
    this.title = _title;
    this.filter = _filter;
    this.name = _name;
    this.type = _type;
    this.bClickCell = _bClickCell;
    this.bExcel = _bExcel;
    this.titleStyle = _titleStyle;
    this.filterStyle = _filterStyle;
    this.cellStyle = _cellStyle;
  }

}
