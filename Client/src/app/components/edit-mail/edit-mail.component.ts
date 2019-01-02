import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppProxy } from '../../services/app.proxy';
import { AppComponent } from '../app/app.component';

@Component({
  selector: 'app-edit-mail',
  templateUrl: './edit-mail.component.html',
  styleUrls: ['./edit-mail.component.css']
})
export class EditMailComponent implements OnInit {

  constructor(private appProxy: AppProxy, private _parent: AppComponent) { }
  @Input()
  mails: string[] = [];

  @Output()
  subject: string;
  body: string;

  mail: string = "";
  add: boolean = false;
  to: string = "";
  ngOnInit() {
    // this.mails.forEach(mail => {
    //   this.to += mail;
    //   this.to += ", ";

    // });
  }
  @Output() close: EventEmitter<any> = new EventEmitter<any>();
  addMail() {
    this.mails.push(this.mail);
  }
  save() {
    if (this.mails.length == 0) {
      this._parent.openMessagePopup("לא נבחרו אברכים");
    }
    else {
      this.appProxy.post('MailToAvrechim', { mailList: this.mails, subject: this.subject, body: this.body })
        .then(result => {
          if (result == true) { this._parent.openMessagePopup("המסר נשלח בהצלחה!"); }
          else {
            this._parent.openMessagePopup("ארעה שגיאה בשליחה!");
          }
          this.close.emit();
        }
          , err => { this._parent.openMessagePopup("ארעה שגיאה בשליחה!"); }
        );
    }

  }
  clos() {
    this.close.emit();
  }
  remove(index: number) {
    this.mails.splice(index, 1);
  }



}
