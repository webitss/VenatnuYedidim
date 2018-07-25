import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBMultySelectChecked',
  pure: false

})
export class FilterBMultySelectCheckedPipe implements PipeTransform {

  transform(lstItems: any): any {
    if (!lstItems)
            return lstItems;
        else
            return lstItems.filter(item =>item['bMultySelectChecked']==true);
  }

}
