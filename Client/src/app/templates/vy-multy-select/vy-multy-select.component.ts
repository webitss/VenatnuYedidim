import { Component, OnInit, Input, Output } from '@angular/core';
import { forEach } from '@angular/router/src/utils/collection';
//import { Ng2SearchPipeModule } from 'ng2-search-filter';
@Component({
  selector: 'app-vy-multy-select',
  templateUrl: './vy-multy-select.component.html',
  styleUrls: ['./vy-multy-select.component.css']
})
export class VyMultySelectComponent implements OnInit {

  // constructor() { this.filterList = new Array<any>(); }
  // @Input()
  // @Output()
  // fullList: any[] ;
  // flag = false;
  // checkboxValueSelectAll: boolean;

  // @Input()
  // id: string;
  // filterList: any[];

  // openOrClose() {
  //   if (this.flag == false) {
       
  //      this.filterList.splice(0,this.filterList.length);
  //     this.fullList.forEach(element => {
  //       if (element['bChecked'] == true)
  //        {
  //          this.filterList.push(element);
  //          }
  //     });
  //   }
    
  // }



  // selectAll() {
  //   if (this.checkboxValueSelectAll == true)
  //     this.fullList.forEach(element => {
  //       element['bChecked'] = true;
  //     });
  //   else
  //     this.fullList.forEach(element => {
  //       element['bChecked'] = false;
  //     });
  // }

  // //select(i: number) {
  //   // 
  //   //this.fullList[i].bChecked = !this.fullList[i].bChecked;
  // //}

  ngOnInit() {
  //   this.fullList.forEach(element => {
  //     element['bChecked'] = false;

  //   });
  }

}
