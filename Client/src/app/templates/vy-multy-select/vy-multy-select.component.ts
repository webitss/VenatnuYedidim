import { Component, OnInit, Input, Output } from '@angular/core';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-vy-multy-select',
  templateUrl: './vy-multy-select.component.html',
  styleUrls: ['./vy-multy-select.component.css']
})
export class VyMultySelectComponent implements OnInit {

  constructor() { }
  @Input()
  @Output()
  fullList: any[] = [{ iPersonId: 1, mane: "aaa" }, { iPersonId: 2, mane: "bbb" }, { iPersonId: 3, mane: "ccc" }, { iPersonId: 4, mane: "ddd" }];
  flag = false;
  checkboxValueSelectAll: boolean;

  @Input()
  id: string;
  filterList: string[];

  aaa() {
    if (this.flag == false) {
      this.fullList.forEach(element => {
        debugger;
        if (element['bChecked'] == true)
        //לא נותן להוסיף לרשימה
          this.filterList.push(element);
      });
    }
  }



  selectAll() {
    if (this.checkboxValueSelectAll == true)
      this.fullList.forEach(element => {
        element['bChecked'] = true;
      });
    else
      this.fullList.forEach(element => {
        element['bChecked'] = false;
      });
      debugger;
  }

  select(i:number) {debugger;
    this.fullList[i].bChecked = !this.fullList[i].bChecked;
  }

  ngOnInit() {
     this.fullList.forEach(element => {
    element['bChecked'] = false;

    });
  }

}
