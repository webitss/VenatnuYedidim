import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PresenceAvrech } from '../../classes/presenceAvrech';
import { ActivatedRoute } from '@angular/router';
import { AppProxy } from '../../services/app.proxy';
import { GlobalService } from '../../services/global.service';

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
  protected presence: PresenceAvrech;
  ngOnInit() {
    this.presence['dtDate'] = new Date((this.presence.dtDatePresence).getTime());
  }
  closeDialog() {
    this.closeMe.emit(null);
  }
  closeAndNoSave() {
    this.closeMeNoSave.emit();
  }
  savePresence(){
    // this.presence.dtDatePresence = this.save.name;
    // this.document.nvDocumentType = this.save.type;
debugger;
    this.appProxy.post('SetPresence', { presenceAvrech: this.presence,iUserId:this.globalService.getUser()['iUserId']}).then(
      data => {
        if (data == 0)
          alert("error in save data")
        else { this.presence.iPresenceAvrech = 1; this.closeDialog(); }
      }
      , err => alert("err"));

  }

}
