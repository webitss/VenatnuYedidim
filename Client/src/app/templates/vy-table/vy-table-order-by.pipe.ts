
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'vyTableOrderBy' })
export class VyTableOrderByPipe implements PipeTransform {
    transform(lstDataRows: Array<any>, lstFields: Array<string>): Array<any> {
        let dir: number, type: string, array: Array<any> = [].concat(lstDataRows ? lstDataRows : []);

        const fieldSorter = (lstFields) => (a, b) => lstFields.map(o => {
            dir = 1;
            type = 'string';

            if (o instanceof Object) {
                type = o[Object.keys(o)[0]];
                o = Object.keys(o)[0];
            }

            if (o[0] === '-') { dir = -1; o = o.substring(1); }

            if (type == 'number') return parseInt(a[o]) > parseInt(b[o]) ? dir : parseInt(a[o]) < parseInt(b[o]) ? -(dir) : 0;
            else return a[o] > b[o] ? dir : a[o] < b[o] ? -(dir) : 0;

        }).reduce((p, n) => p ? p : n, 0);

        return array.sort(fieldSorter(lstFields));
    }
}



@Pipe({ name: 'OrderBy' })
export class OrderByPipe implements PipeTransform {
    transform(lstData: Array<any>, iDirection: number = 1): Array<any> {
        let array: Array<any> = [].concat(lstData ? lstData : []);
        return array.sort((a, b) => {

            return a > b ? iDirection : a < b ? -(iDirection) : 0;
        });
    }
}