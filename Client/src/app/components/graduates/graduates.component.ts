import { Component, OnInit, ViewChild, Inject, forwardRef } from '@angular/core';
import { VyTableColumn } from '../../templates/vy-table/vy-table.classes';
import { AppProxy } from '../../services/app.proxy';
import { Router, ActivatedRoute } from '@angular/router';
import { Student } from '../../classes/student';
import { AppComponent } from '../app/app.component';
import { GlobalService } from '../../services/global.service';
import { SysTableService } from '../../services/sys-table.service';

@Component({
  selector: 'app-graduates',
  templateUrl: './graduates.component.html',
  styleUrls: ['./graduates.component.css']
})
export class GraduatesComponent implements OnInit {


  constructor(public globalService:GlobalService, private appProxy: AppProxy, private router: Router, private route: ActivatedRoute,@Inject(forwardRef(() => AppComponent)) private _parent:AppComponent) { }
  param: any;
  id: number;
  currentYeshivaOfStudent: Map<number, string>;
  studentList: Student[];
  private iPersonId:number;
  @ViewChild('graduates') graduates: any;
  public lstColumns: Array<VyTableColumn> = new Array<VyTableColumn>();
  ngOnInit() {
    debugger;
    this.iPersonId = this.globalService.getUser()['iPersonId'];

    debugger;
    this.id = 0;
    console.log("refresh...");
    this.id = this.globalService.getUser().iPermissionId == SysTableService.permissionType.Management ? 0 : this.globalService.getUser().iPersonId;

    this.appProxy.post('GetGraduatesList', { iUserId: this.id }).then(data => {
      debugger;
      this.studentList = data;
      this.appProxy.get("GetCurrentYeshivaOfStudent").then(data => {
        this.currentYeshivaOfStudent = data;
      this.studentList.forEach(
        st => {
          st['edit'] = '<div class="edit"></div>';
          if(this.currentYeshivaOfStudent[st.iPersonId])
            {
              st['nvYeshivaName'] = this.currentYeshivaOfStudent[st.iPersonId];
            }
        })
      });
    }, err => { this._parent.openMessagePopup("שגיאה בשליפת הנתונים!"); });


    this.lstColumns.push(new VyTableColumn('עריכה', 'edit', 'html', true, false));
    this.lstColumns.push(new VyTableColumn('שם פרטי', 'nvFirstName'));
    this.lstColumns.push(new VyTableColumn('שם משפחה', 'nvLastName'));
    this.lstColumns.push(new VyTableColumn('טלפון', 'nvPhone'));
    this.lstColumns.push(new VyTableColumn('נייד', 'nvMobile'));
    this.lstColumns.push(new VyTableColumn('דו"אל', 'nvEmail'));
    this.lstColumns.push(new VyTableColumn('מוסד לימודים', 'nvYeshivaName'));

  }
  downloadExcel() {
      
    this.graduates.downloadExcel();
  }
  tableToPdf(name: string) {
    this.graduates.downloadPdf(name, 'pdf');
  }

  editStudent(even) {
    debugger;
    this.router.navigate(['students/student/' + even.iPersonId + '/' + 'student-details'])
  }
}
