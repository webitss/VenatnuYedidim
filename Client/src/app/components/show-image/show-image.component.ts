import { Component, OnInit, ViewChild } from '@angular/core';
import { AppProxy } from '../../services/app.proxy';
import { NgxGalleryImage, NgxGalleryOptions, NgxGalleryAnimation } from 'ngx-gallery';
import { settingsFrontend } from '../../services/settings-frontend.service';
import { Alert } from 'selenium-webdriver';
import { NgxImageGalleryComponent } from '../../../../node_modules/ngx-image-gallery';

// import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
const GLOBAL={title:"כותרת",GlobalVerMarch:"טקסט_ראשי",GlobalMarchSF:"טקסט_משני"}
@Component({
  selector: 'app-show-image',
  templateUrl: './show-image.component.html',
  styleUrls: ['./show-image.component.css']
})
export class ShowImageComponent implements OnInit {
  
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[]=new Array<NgxGalleryImage>();

  constructor(private appProxy: AppProxy, public settingsFrontend:settingsFrontend) { }
 
protected titaieName:string="ונתנו ידידים";
ngxImageGallery: NgxImageGalleryComponent;
public divModal:boolean;

protected listImage:string[]=["http://localhost:14776/Files/red.jpg","assets/חוף ים.jpg",
"assets/3-big.jpg","assets/IMG_5650.JPG",
"assets/IMG_5650.JPG","assets/IMG_5650.JPG",]
protected documents: any;
protected password:string;


protected lstColumns = [{
 
  title: 'ערך',
  type: 'html',      
 
},
{
  title: 'ערך',
  type: 'html',
},
{
  title: 'ערך',
  type: 'html',
},
]

 
ngOnInit(): void {
  
  this.galleryOptions = [
      {
          width: '600px',
          height: '400px',
          thumbnailsColumns: 4,
          imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
          breakpoint: 800,
          width: '100%',
          height: '600px',
          imagePercent: 80,
          thumbnailsPercent: 20,
          thumbnailsMargin: 20,
          thumbnailMargin: 20
      },
      // max-width 400
      {
          breakpoint: 400,
          preview: false
      }
  ];
  this.settingsFrontend.setGlobalParameters();
//   this.settingsFrontend.GetGlobalParameters().then(res=>{
// alert((<any>res)[GLOBAL.title])
//    this.settingsFrontend.GlobalHeader=(<any>res).filter(r=>r.nvTitle==[GLOBAL.title])[0],
   
//    this.settingsFrontend.GlobalMarchSF=(<any>res).filter(r=>r.nvTitle==[GLOBAL.GlobalVerMarch])[0],

//  this.settingsFrontend.GlobalVerMarch=(<any>res).filter(r=>r.nvTitle==[GLOBAL.GlobalMarchSF])[0]
//  debugger;
// alert(GLOBAL.title+"   "+this.settingsFrontend.GlobalHeader.nvValue) 
// alert(GLOBAL.GlobalVerMarch+"   "+this.settingsFrontend.GlobalVerMarch.nvValue)
//  alert(GLOBAL.GlobalMarchSF+"   "+this.settingsFrontend.GlobalMarchSF.nvValue) 
// })
    
     
 
// for(var i=0;i<this.listImage.length;i++)
// {
// this.galleryImages.push( {
//   small: this.listImage[i],
//   medium: this.listImage[i],
//   big: this.listImage[i]
// })
// }

 
this.appProxy.get('GetDocumentsOfTadmit').then(data => {
  debugger;
  this.documents = data;
    this.documents.forEach(element => {
     debugger;
     
      if(element.nvDocumentName=="Boy Thinking (2).jpg" ||element.nvDocumentName=="Smiling Girl 1.jpg"||element.nvDocumentName=="Girl Thinking.jpg"||element.nvDocumentName=="Boy in Father Suit.jpg"||element.nvDocumentName=="Girl Thinking.jpg"||element.nvDocumentName=="Girl Talking Hebrew 3.jpg"||
      element.nvDocumentName=="Hebrew Talk Bubble 4.jpg"||element.nvDocumentName=="Girl 4.jpg"||element.nvDocumentName=="Girl Scratching Head.jpg"){
       
      this.galleryImages.push({
        small:AppProxy.baseDevUrl+'/Files/'  + element.nvDocumentName,
        medium: AppProxy.baseDevUrl+'/Files/'+element.nvDocumentName,
        big: AppProxy.baseDevUrl+'/Files/'  + element.nvDocumentName,
    });
    }
    });
    
  }
    , err => alert(err));

}
saveLogin(){
  
}
openGallery(index: number = 0) {
  this.ngxImageGallery.open(index);
}
  
// close gallery
closeGallery() {
  this.ngxImageGallery.close();
}
  
// set new active(visible) image in gallery
newImage(index: number = 0) {
  this.ngxImageGallery.setActiveImage(index);
}
  
// next image in gallery
nextImage(index: number = 0) {
  this.ngxImageGallery.next();
  alert("nextImage")
}
  
// prev image in gallery
prevImage(index: number = 0) {
  this.ngxImageGallery.prev();
}
  
/**************************************************/
  
// EVENTS
// callback on gallery opened
galleryOpened(index) {
  console.info('Gallery opened at index ', index);
}

// callback on gallery closed
galleryClosed() {
  console.info('Gallery closed.');
}

// callback on gallery image clicked
galleryImageClicked(index) {
  console.info('Gallery image clicked with index ', index);
}

// callback on gallery image changed
galleryImageChanged(index) {
  console.info('Gallery image changed to index ', index);
}

// callback on user clicked delete button
deleteImage(index) {
  console.info('Delete image at index ', index);
}
}



