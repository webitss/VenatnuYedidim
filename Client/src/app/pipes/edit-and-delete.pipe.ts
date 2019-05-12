import { Pipe, PipeTransform } from '@angular/core';
import { forEach } from '@angular/router/src/utils/collection';

@Pipe({
  name: 'editAndDelete'
})
export class EditAndDeletePipe implements PipeTransform {

  transform(lstVyTable: any): any {
    lstVyTable.forEach(e => { 
         debugger;
    if(e.title!='עריכה'&&e.title!='מחיקה')
    return e;
  });

  alert("come")
    // if(col.title!='עריכה'&&col.title!='מחיקה')
    // return col;
  }

}
