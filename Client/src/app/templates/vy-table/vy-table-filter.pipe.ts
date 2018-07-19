import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'vyTableFilter',
    pure: false
})
export class VyTableFilterPipe implements PipeTransform {
    transform(lstDataRows: Array<any>, lstColumns: Array<any>): Array<any> {
        if (!lstDataRows || !lstColumns)
            return lstDataRows;
        else
            return lstDataRows.filter(item =>
                lstColumns.filter(col => col.filter == null || col.filter == '' || item[col.name].indexOf(col.filter) != -1).length == lstColumns.length
            );
    }
}


