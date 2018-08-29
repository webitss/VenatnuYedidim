import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class DialogService {

    confirm(message?: string) {
      const confirmation = window.confirm(message || 'Are you sure?');
  
      // return of(confirmation);
      return confirmation;
    };

  constructor() { }

}
