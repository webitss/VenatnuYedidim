import { Injectable } from '@angular/core';
import { AppProxy } from './app.proxy';

@Injectable()
export class SysTableService {
  Mykey:string;
  public static dataTables = {
    deathType: {
      iSysTableId: 1,
      SysTableRow: []
    },
    sheetType: {
      iSysTableId: 2,
      SysTableRow: []
    },
    studentType: {
      iSysTableId: 3,
      SysTableRow: []
    },
    permissionType: {
      iSysTableId: 4,
      SysTableRow: []
    },
    belongSheetType: {
      iSysTableId: 5,
      SysTableRow: []
    },
    arrivalType: {
      iSysTableId: 6,
      SysTableRow: []
    },
    participationType: {
      iSysTableId: 7,
      SysTableRow: []
    },
    roleType: {
      iSysTableId: 8,
      SysTableRow: []
    }
  }

  constructor(private appProxy: AppProxy) { }
 ////#region מקבל ID של טבלה מחזיר ערכים מאותה טבלה 
   getValues(iSysTableId: number) {
 
     console.log(iSysTableId+"arived");
    for (let key in SysTableService.dataTables) {
      console.log(key)
       if (SysTableService.dataTables[key].iSysTableId===iSysTableId ){
        this.Mykey=key;
       if (SysTableService.dataTables[key].SysTableRow.length > 0 )
       {
         return SysTableService.dataTables[key].SysTableRow;
        
       }
      }
      }
     
   console.log(this.appProxy.post("GetValues", iSysTableId));
      this.appProxy.post("GetValues", iSysTableId).then(l=>SysTableService.dataTables[this.Mykey]=l);
  }
  ////#endregion
 //#region  מחזיר את שמות כל הטבלאות
  getTableNames(): Promise<string[]> {
    return this.appProxy.get("GetAllNames");
  }

  //#endregion
}
