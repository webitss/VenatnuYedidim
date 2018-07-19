import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { forEach } from '@angular/router/src/utils/collection';

@Pipe({
    name: 'filter',
    pure: false
})
export class FilterPipe implements PipeTransform {
    transform(lstItems: Array<any>,filterText: string): Array<any> {
        if (!lstItems || !filterText || filterText == '' )
            return lstItems;
        else
            return lstItems.filter(item =>item['toString'].indexOf(filterText)!=-1);
           
    }
}