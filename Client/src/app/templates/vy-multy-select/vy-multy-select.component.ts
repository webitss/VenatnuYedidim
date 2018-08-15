import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { forEach } from '@angular/router/src/utils/collection';
//import { Ng2SearchPipeModule } from 'ng2-search-filter';
@Component({
  selector: 'app-vy-multy-select',
  templateUrl: './vy-multy-select.component.html',
  styleUrls: ['./vy-multy-select.component.css']
})
export class VyMultySelectComponent implements OnInit {

  constructor() { }
  @Input()
  @Output()
  fullList: Array<string>;
  flag = false;
  checkboxValueSelectAll: boolean;


  id: string;

  @Input()
  @Output()
  selectedList: Array<any>;
  onOverFlag:boolean=false;
  @Input()
  titleStr:string;

  @Input()
  inputTitle:string;
  
  @Output()
  onSave: EventEmitter<Array<any>> = new EventEmitter<Array<any>>();


  openOrClose() {
  if (this.flag == false) {
      // if(this.selectedList!=null)
      this.selectedList.splice(0, this.selectedList.length);
      this.fullList.forEach(element => {
        if (element['bMultySelectChecked'] == true) {
          this.selectedList.push(element);
        }
      });
      this.onSave.emit(this.selectedList);
    }
  }



  selectAll() {
    if (this.checkboxValueSelectAll == true)
      this.fullList.forEach(element => {
        element['bMultySelectChecked'] = true;
      });
    else
      this.fullList.forEach(element => {
        element['bMultySelectChecked'] = false;
      });
  }

  //select(i: number) {
  // 
  //this.fullList[i].bMultySelectChecked = !this.fullList[i].bMultySelectChecked;
  //}

  ngOnInit() {
    this.selectedList = new Array<any>();
    //this.fullList.forEach(element => {
      //element['bMultySelectChecked'] = false;
      //שיהיה דינאמי
    //  element['toString'] = element['nvFirstName'] + element['nvLastName'] + element['nvIdentityCard'];
  //  });
  }

}

