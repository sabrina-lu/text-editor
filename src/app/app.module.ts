import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

import { AngularFireModule } from "@angular/fire"
import { AngularFireAuthModule } from "@angular/fire/auth"
import { AngularFirestoreModule } from '@angular/fire/firestore'
import { environment } from '../environments/environment'
import { SignInComponent, TextEditorComponent } from './components'



@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    TextEditorComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
