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
    },
    meetingType: {
      iSysTableId: 9,
      SysTableRow: []
    },
    conversationType: {
      iSysTableId: 10,
      SysTableRow: []
    },
    Task: {
      iSysTableId: 11,
      SysTableRow: []
    }
  }

  public static permissionType = { Management: 5 }

  constructor(private appProxy: AppProxy) { }
  ////#region מקבל ID של טבלה מחזיר ערכים מאותה טבלה 
  getValues(iSysTableId: number, col?:any): Promise<Array<SysTableRow>> {

    // console.log(iSysTableId + "arived");
    for (let key in SysTableService.dataTables) {

      // console.log(key)
      // console.log("log" + SysTableService.dataTables[key].iSysTableId)

      if (SysTableService.dataTables[key].iSysTableId == iSysTableId) {
        this.Mykey = key;
        if (SysTableService.dataTables[key].SysTableRow.length > 0) {
          if(col)col(SysTableService.dataTables[key].SysTableRow)
          return Promise.resolve(SysTableService.dataTables[key].SysTableRow);

        }
      }
    }

    return this.appProxy.post("GetValues", { iSysTableId: iSysTableId })

      .then(l => {
        if (l) {
          SysTableService.dataTables[this.Mykey].SysTableRow = l
          return SysTableService.dataTables[this.Mykey].SysTableRow;
        }
        else
          console.log("err");
      }

      );

  }
  ////#endregion
  //#region  מחזיר את שמות כל הטבלאות
  getTableNames(): Promise<Array<SysTables>> {

    return this.appProxy.get("GetAllNames");

  }
  //#endregion
  editValue(row: SysTableRow): any {

    this.appProxy.post("UpdateValue", { sysTableRow: row }).
      then(l => {
        if (l === "true") {
          return true;
        }
        return false;
      });


  }

  addValue(row: SysTableRow): Promise<boolean> {
    return this.appProxy.post("AddValue", { sysTableRow: row }).
      then(l => {
        if (l) {

          return true;
        }
        return false;
      });
  }
}
