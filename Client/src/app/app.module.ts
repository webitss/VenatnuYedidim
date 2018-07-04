import { NgModule } from '@angular/core';
import { BrowserModule} from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpModule, Http } from "@angular/http";
import { RouterModule, Route } from '@angular/router';
//--- services ---
import { AppProxy } from './services/app.proxy';
//--- components ---
import { AppComponent } from './components/app/app.component';
import { AvrechimComponent } from './components/app/avrechim/avrechim.component';

@NgModule({
  declarations: [
    //components
    AppComponent,
    AvrechimComponent    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,   
    RouterModule.forRoot([
      {
        path: "/Avrechim", component: AvrechimComponent,     
      },
    ], { useHash: true }) 
  ],
  providers: [AppProxy],
  bootstrap: [AppComponent]
})
export class AppModule { }
