import { Component, OnInit, Input, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'app-vy-pop-up',
  templateUrl: './vy-pop-up.component.html',
  styleUrls: ['./vy-pop-up.component.css']
})
export class VyPopUpComponent implements OnInit {

  @Input()
  isDouble:boolean;

  @Input()
  message:string;

  @Input()
  header:string;

  @Output() 
  close: EventEmitter<any> = new EventEmitter();

  @Output() 
  ok: EventEmitter<any> = new EventEmitter();

  closeModal(){
    this.close.emit();
  }

  okClicked() {
    this.ok.emit();
  }

  // @HostListener('document:click', ['$event'])
  // clickout(event) {
  //   if(this.eRef.nativeElement.contains(event.target)) {
  //     alert("clicked inside");
  //   } else {
  //    this.closeModal();
  //   }
  // }

  constructor(private eRef: ElementRef) { }

  ngOnInit() {
  }

}
