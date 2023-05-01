import { NgModule } from '@angular/core';
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
    PassChangeComponent
  ],
  imports: [
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
  ],
  providers: [UserService, EventService, NoteService, TodoService],
  bootstrap: [AppComponent],
})
export class AppModule { }
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}