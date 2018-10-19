import { Component, OnInit } from '@angular/core';
import { TGlobalParameters } from '../../classes/TGlobalParameters';
import { settingsFrontend, GLOBAL } from '../../services/settings-frontend.service';
import { AppProxy } from '../../services/app.proxy';
import { GlobalService } from '../../services/global.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Document } from '../../classes/document';
import { SysTableService } from '../../services/sys-table.service';

@Component({
  selector: 'app-settings-frontend',
  templateUrl: './settings-frontend.component.html',
  styleUrls: ['./settings-frontend.component.css']
})
export class SettingsFrontendComponent implements OnInit {
  public GlobalHeader:TGlobalParameters=new TGlobalParameters();

  public  GlobalVerMarch:TGlobalParameters=new TGlobalParameters();
  public GlobalMarchSF:TGlobalParameters=new TGlobalParameters();
  public GlobalParameters: TGlobalParameters[] = new Array<
    TGlobalParameters
  >();
  belongSheetType:number;
  document: Document;
  documents: any[] = new Array();
  constructor(
    public settingsFrontend: settingsFrontend,
    private appProxy: AppProxy,
    private globalService: GlobalService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private sysTableService: SysTableService
  ) {}
  ngOnInit() {   
    this.sysTableService.getValues(SysTableService.dataTables.belongSheetType.iSysTableId).then(data => this.belongSheetType= data.filter(x => x.nvValue == 'תדמית')[0].iSysTableRowId);
    this.loadDocuments();
  this.settingsFrontend.setGlobalParameters();
  this.GlobalHeader=this.settingsFrontend.GlobalHeader;
  this.GlobalMarchSF=this.settingsFrontend.GlobalMarchSF;
  this.GlobalVerMarch=this.settingsFrontend.GlobalVerMarch;
  }


  loadDocuments() {
    this.appProxy.get('GetDocumentsOfTadmit').then(
      data => {
        this.documents = data;
        console.log(this.documents);
      },
      err => alert(err)
    );
  }

  addDocument() {
    this.document = new Document();
    this.document.bShowInTadmit = false;
    this.document.iBelongingType =  this.belongSheetType;
    this.document.iCategoryType = 0;
  }

  editDocument(id) {
    this.documents.forEach(element => {
      if (element.iDocumentId === id) {
        this.document = new Document();
        this.document.iBelongingType =  this.belongSheetType;
        this.document.iCategoryType = 0;
        this.document.iDocumentId = element.iDocumentId;
        this.document.iItemId = element.iItemId;
        this.document.nvComment = element.nvComment;
        this.document.nvDocumentName = element.nvDocumentName;
        this.document.nvDocumentType = element.nvDocumentType;
        this.document.bShowInTadmit = element.bShowInTadmit;
      }
    });
  }

  closeDocumentDialog(save) {
    // alert(save);
    if (save === true) {
      let len = this.documents.length;
      let i;
      for (i = 0; i < len; i++) {
        if (this.documents[i].iDocumentId == this.document.iDocumentId) {
          this.documents.splice(i, 1, this.document);
          break;
        }
      }
      if (i == len) this.documents.push(this.document);
    }
    this.document = null;
    // this.loadDocuments();
  }

  deleteDocument(id) {
    this.appProxy
      .post('DeleteDocument', {
        iDocumentId: id,
        iUserId: this.globalService.getUser()['iUserId']
      })
      .then(
        data => {
          let len = this.documents.length;
          for (let i = 0; i < len; i++) {
            if (this.documents[i].iDocumentId == id) {
              this.documents.splice(i, 1);
              break;
            }
          }
        },
        err => alert(err)
      );
  }

saveGlobalParams(){
alert("saveGlobalParams")

  this.settingsFrontend.GlobalHeader.nvTitle=GLOBAL.title;
  this.settingsFrontend.GlobalHeader.nvValue=this.GlobalHeader.nvValue;
 
  this.GlobalParameters.push(this.settingsFrontend.GlobalHeader);
  this.settingsFrontend.GlobalVerMarch.nvTitle=GLOBAL.GlobalVerMarch;
  this.settingsFrontend.GlobalVerMarch.nvValue=this.GlobalVerMarch.nvValue;
  this.GlobalParameters.push(this.settingsFrontend.GlobalVerMarch);
  this.settingsFrontend.GlobalMarchSF.nvTitle=GLOBAL.GlobalMarchSF;
  this.settingsFrontend.GlobalMarchSF.nvValue=this.GlobalMarchSF.nvValue;
  this.GlobalParameters.push(this.settingsFrontend.GlobalMarchSF);
 debugger;
  this.settingsFrontend.GetGlobalParameters().then(res=>{
 
    if((<any>res).length>0){

      this.settingsFrontend.updateGlobalParameters(this.GlobalParameters).then(

        l=>alert("udp"));
     
    }
    else{
      this.settingsFrontend.SaveGlobalParameters(this.GlobalParameters).then(
      
        l=>alert("ins"));
      }
  });
 
}
 


}
