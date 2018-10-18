import { Component, OnInit, ViewChild } from '@angular/core';
import { VyTableColumn } from '../../templates/vy-table/vy-table.classes';
import { AppProxy } from '../../services/app.proxy';
import { Router, ActivatedRoute } from '@angular/router';
import { Student } from '../../classes/student';

@Component({
  selector: 'app-graduates',
  templateUrl: './graduates.component.html',
  styleUrls: ['./graduates.component.css']
})
export class GraduatesComponent implements OnInit {

  
  constructor(private appProxy: AppProxy, private router: Router,private route: ActivatedRoute ) { }
  param:any;
  id: number;
  studentList: Student[];
  @ViewChild('graduates') graduates:any;
  public lstColumns: Array<VyTableColumn> = new Array<VyTableColumn>();
  ngOnInit() {

    
  
    this.id = 0;

    this.appProxy.post('GetGraduatesList', { iUserId: this.id }).then(data => {
      this.studentList = data;

      this.studentList.forEach(
        st => {
           st['edit'] = '<div class="edit"></div>'; 
          })
    }, err => { alert(err); });


    this.lstColumns.push(new VyTableColumn('עריכה', 'edit', 'html', true,false));
    this.lstColumns.push(new VyTableColumn('שם פרטי', 'nvFirstName'));
    this.lstColumns.push(new VyTableColumn('שם משפחה', 'nvLastName'));
    this.lstColumns.push(new VyTableColumn('טלפון', 'nvPhone'));
    this.lstColumns.push(new VyTableColumn('נייד', 'nvMobile'));
    this.lstColumns.push(new VyTableColumn('דו"אל', 'nvEmail'));
    this.lstColumns.push(new VyTableColumn('מוסד לימודים', 'nvYeshivaName'));

}
downloadExcel(){
  debugger;
  this.graduates.downloadExcel();
}
tableToPdf(name:string){
  this.graduates.downloadPdf(name,'pdf');
    }
}
