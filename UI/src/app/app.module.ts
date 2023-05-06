import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserFormComponent } from './modals/user-form/user-form.component';
import { UserService } from './services/api/user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmComponent } from './modals/confirm/confirm.component';
import { EventService } from './services/api/event.service';
import { NoteService } from './services/api/note.service';
import { TodoService } from './services/api/todo.service';
import { NotesComponent } from './components/notes/notes.component';
import { AverageComponent } from './components/average/average.component';
import { NoteDetailsComponent } from './components/notes/note-details/note-details.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { PassChangeComponent } from './modals/pass-change/pass-change.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarComponent } from './components/calendar/calendar.component';
import { CommonModule } from '@angular/common';
import { EventFormComponent } from './modals/event-form/event-form.component';
import { TodoListComponent } from './modals/todo-list/todo-list.component';
import { TodoComponent } from './components/todo/todo.component';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    UserFormComponent,
    LoginComponent,
    NavbarComponent,
    HomeComponent,
    ConfirmComponent,
    NotesComponent,
    AverageComponent,
    NoteDetailsComponent,
    EditUserComponent,
    PassChangeComponent,
    CalendarComponent,
    EventFormComponent,
    TodoListComponent,
    TodoComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    CalendarModule.forRoot({ 
      provide: DateAdapter, useFactory: adapterFactory 
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [UserService, EventService, NoteService, TodoService],
  bootstrap: [AppComponent],
})
export class AppModule { }
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}