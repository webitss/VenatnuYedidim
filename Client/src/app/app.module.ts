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
<<<<<<< HEAD
import { UsersComponent } from './components/app/users/users.component';
import { UserDetailsComponent } from './components/app/users/user-details/user-details.component';

=======
import { EventsComponent } from './components/events/events.component';
>>>>>>> 35367144c03239a6b6efe2eaf0b737322ba167df

@NgModule({
  declarations: [
    //components
    AppComponent,
<<<<<<< HEAD
    UsersComponent,
    UserDetailsComponent
=======
    EventsComponent    
>>>>>>> 35367144c03239a6b6efe2eaf0b737322ba167df
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,   
    RouterModule.forRoot([
      {
<<<<<<< HEAD
        path:"user-details",component:UserDetailsComponent
=======
        path: "events", component:EventsComponent,
       
>>>>>>> 35367144c03239a6b6efe2eaf0b737322ba167df
      },
    ], { useHash: true }) 
  ],
  providers: [AppProxy],
  bootstrap: [AppComponent]
})
export class AppModule { }
