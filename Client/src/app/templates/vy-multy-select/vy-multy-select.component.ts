import { Component, OnInit, Input, Output } from '@angular/core';
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
  fullList: Array<any>;
  flag = false;
  checkboxValueSelectAll: boolean;

  id: string;

  @Input()
  @Output()
  selectedList: Array<any>;

  openOrClose() {
    if (this.flag == false) {
       
       this.selectedList.splice(0,this.selectedList.length);
      this.fullList.forEach(element => {
        if (element['bMultySelectChecked'] == true)
         {
           this.selectedList.push(element);
           }
      });
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
    this.fullList.forEach(element => {
      element['bMultySelectChecked'] = false;
      //שיהיה דינאמי
        element['toString']=element['nvFirstName']+element['nvLastName']+element['nvIdentityCard'];

    });
  }

}

    