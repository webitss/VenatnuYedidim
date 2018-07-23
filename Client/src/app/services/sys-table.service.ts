import { Injectable } from '@angular/core';
import { AppProxy } from './app.proxy';
import { promise } from 'protractor';
import { SysTables } from '../classes/SysTables';
import { SysTableRow } from '../classes/SysTableRow';

@Injectable()
export class SysTableService {
  Mykey: string;
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
  getValues(iSysTableId: number): Promise<Array<SysTableRow>> {

    console.log(iSysTableId + "arived");
    for (let key in SysTableService.dataTables) {
      console.log(key)
      if (SysTableService.dataTables[key].iSysTableId === iSysTableId) {
        this.Mykey = key;
        if (SysTableService.dataTables[key].SysTableRow.length > 0) {
          return SysTableService.dataTables[key].SysTableRow;

        }
      }
    }

    return this.appProxy.post("GetValues", { iSysTableId: iSysTableId })

      .then(l => {
        if (l) {
          SysTableService.dataTables[this.Mykey] = l
          return SysTableService.dataTables[this.Mykey];
        }
        else
          alert("err");
      }

      );

  }
  ////#endregion
  //#region  מחזיר את שמות כל הטבלאות
  getTableNames(): Promise<SysTables[]> {
    return this.appProxy.get("GetAllNames");

  }

  //#endregion
}
