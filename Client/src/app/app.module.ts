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

@NgModule({
  declarations: [
    //components
    AppComponent    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,   
    // RouterModule.forRoot([
    //   {
    //     path: ":uGameId", component: ?,
    //     children: [
    //       { path: "", component: ? },
    //       { path: "opening", component: ? },
    //       { path: "clickers/:uDivisionId/:step", component: ? },
    //       { path: "summary/:mode", component: ? },
    //     ]
    //   },
    // ], { useHash: true }) 
  ],
  providers: [AppProxy],
  bootstrap: [AppComponent]
})
export class AppModule { }
