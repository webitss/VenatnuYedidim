import { Injectable } from '@angular/core';
import { AppProxy } from './app.proxy';

@Injectable()
export class SysTableService {

  // public static dataTables = {
  //   deathType: {
  //     iSysTableId: 1,
  //     SysTableRow: []
  //   },
  //   sheetType: {
  //     iSysTableId: 2,
  //     SysTableRow: []
  //   },
  //   studentType: {
  //     iSysTableId: 3,
  //     SysTableRow: []
  //   },
  //   permissionType: {
  //     iSysTableId: 4,
  //     SysTableRow: []
  //   },
  //   belongSheetType: {
  //     iSysTableId: 5,
  //     SysTableRow: []
  //   },
  //   arrivalType: {
  //     iSysTableId: 6,
  //     SysTableRow: []
  //   },
  //   participationType: {
  //     iSysTableId: 7,
  //     SysTableRow: []
  //   },
  //   roleType: {
  //     iSysTableId: 8,
  //     SysTableRow: []
  //   }
  // }

  constructor(private appProxy: AppProxy) { }
  //#region getValues
  // getValues(iSysTableId: number) {
  //   var flag;
  //   flag = false;
  //   for (let key in SysTableService.dataTables) {
  //     if (SysTableService.dataTables[key].SysTableRow > 0) {
  //       return SysTableService.dataTables[key].SysTableRow;
  //       flag = true;
  //       break;
  //     }

  //   }
  //   if (flag == false)
  //     this.appProxy.post("GetValues", iSysTableId);
  // }
  //#endregion
  //#region  getTableNames
  // getTableNames(): Promise<string[]> {
  //   return this.appProxy.get("GetAllNames");
  // }

  //#endregion
}
