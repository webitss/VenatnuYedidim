import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable({
  providedIn: 'root'
})
export class ParentChildService {

  constructor() {
    
   }
       // Observable string sources
       private emitChangeSource = new Subject<any>();
       // Observable string streams
       changeEmitted$ = this.emitChangeSource.asObservable();
       // Service message commands
       emitChange() {
           this.emitChangeSource.next();
       }
}
