import { Component, OnInit } from '@angular/core';
import { Document } from '../../classes/document';
import { AppProxy } from '../../services/app.proxy';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-event-media',
  templateUrl: './event-media.component.html',
  styleUrls: ['./event-media.component.css']
})
export class EventMediaComponent implements OnInit {
  id: number;
  document: Document;
  documents: any[]=new Array();

  constructor(private appProxy: AppProxy, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.parent.params.subscribe(params => {
      this.id = params['iEventId'];
    });

    this.loadDocuments();
  }

  loadDocuments() {
    this.appProxy.post('GetDocumentsByItemId', { iItemId: this.id }).then(data => {
      this.documents = data;
      console.log(this.documents);
    }
      , err => alert(err));
  }
  addDocument() {
    this.document = new Document();
    this.document.iItemId = this.id;
    this.document.iBelongingType = 3;
    this.document.iCategoryType=0;
  }
  closeDocumentDialog() {
    this.document = null;
    this.loadDocuments();
  }

  deleteDocument(id){
    this.appProxy.post('DeleteDocument', { iDocumentId: id }).then(data => {
      alert("success"),err=>alert("error")
    }
      , err => alert(err));
  }
}
