import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpModule, Http } from "@angular/http";
import { RouterModule, Route } from '@angular/router';

//--- services ---
import { AppProxy } from './services/app.proxy';
//--- components ---
import { AppComponent } from './components/app/app.component';
import { SettingsComponent } from './components/settings/settings.component';
import { UsersComponent } from './components/users/users.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { EventsComponent } from './components/events/events.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { EventParticipantsComponent } from './components/event-participants/event-participants.component';
import { EventComponent } from './components/event/event.component';

@NgModule({
  declarations: [
    //components
    AppComponent,
    SettingsComponent,
    UsersComponent,
    UserDetailsComponent,
    EventsComponent,
    EventDetailsComponent,
    EventParticipantsComponent,
    EventComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot([
      // { path: "students", component: StudentsComponent },
      // { path: "avrechim", component: AvrechimComponent },
      { path: "events", component: EventsComponent },
      { path: "events/event", component: EventComponent
       ,children:([ { path: "event-participants", component: EventParticipantsComponent }
       ,{ path: "event-details", component:  EventDetailsComponent}])
      },
      { path: "users", component: UsersComponent },
      { path: "users/user-details", component: UserDetailsComponent },
      { path: "settings", component: SettingsComponent }
    ], { useHash: true })
  ],
  providers: [AppProxy],
  bootstrap: [AppComponent]
})
export class AppModule { }
