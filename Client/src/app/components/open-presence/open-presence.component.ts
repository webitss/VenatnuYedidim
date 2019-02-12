import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PresenceAvrech } from '../../classes/presenceAvrech';
import { ActivatedRoute } from '@angular/router';
import { AppProxy } from '../../services/app.proxy';
import { GlobalService } from '../../services/global.service';
import { dashCaseToCamelCase } from '@angular/compiler/src/util';

@Component({
  selector: 'app-open-presence',
  templateUrl: './open-presence.component.html',
  styleUrls: ['./open-presence.component.css']
})
export class OpenPresenceComponent implements OnInit {

  constructor(  private appProxy: AppProxy,private globalService:GlobalService ) { }
  @Input()
  @Output()
  closeMe = new EventEmitter();
  @Output()
  closeMeNoSave = new EventEmitter();
  @Output()
  @Input()
  presence: PresenceAvrech;
  @Output()
  @Input()
  currentPresence:PresenceAvrech;
  ngOnInit() {
     
    this.currentPresence=new PresenceAvrech();
    this.currentPresence=Object.assign({},this.presence);
    this.currentPresence['dtDate']=this.currentPresence.dtDatePresence;
  }

  

  closeDialog(p) {
    this.closeMe.emit(p);
  }
  closeAndNoSave() {
    this.closeMeNoSave.emit();
  }
  savePresence(){
    // this.presence.dtDatePresence = this.save.name;
    // this.document.nvDocumentType = this.save.type;
 
this.currentPresence.dtDatePresence=this.currentPresence['dtDate'];
    this.appProxy.post('SetPresence', { presenceAvrech: this.currentPresence,iUserId:this.globalService.getUser()['iUserId']}).then(
      data => {
        if (data == 0)
          alert("error in save data")
        else { this.currentPresence.iPresenceAvrech = data; this.closeDialog(this.currentPresence); }
      }
      );

  }

}
