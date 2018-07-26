import { Component, OnInit } from '@angular/core';
import { AppProxy } from '../../services/app.proxy';

@Component({
  selector: 'app-student-documents',
  templateUrl: './student-documents.component.html',
  styleUrls: ['./student-documents.component.css']
})
export class StudentDocumentsComponent implements OnInit {

  constructor(private appProxy:AppProxy) { }

  ngOnInit() {
  }
  
}
