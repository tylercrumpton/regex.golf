import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule, firebaseAuthConfig, AuthMethods, AuthProviders } from 'angularfire2';

import 'hammerjs';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { SignupDialogComponent } from './signup-dialog/signup-dialog.component';

import { DialogService } from './dialog.service';

export const firebaseConfig = {
  apiKey: "AIzaSyAoBguDPKHr6rGDMIKnuj3b_Rjlml1tI-8",
  authDomain: "regexgolf-dc6f6.firebaseapp.com",
  databaseURL: "https://regexgolf-dc6f6.firebaseio.com",
  projectId: "regexgolf-dc6f6",
  storageBucket: "regexgolf-dc6f6.appspot.com",
  messagingSenderId: "386574856391"
};
export const authConfig = {
    provider: AuthProviders.Password,
    method: AuthMethods.Password,
    scope: ['email']
  };

@NgModule({
  declarations: [
    AppComponent,
    LoginDialogComponent,
    SignupDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(firebaseConfig, authConfig),
  ],
  providers: [DialogService],
  bootstrap: [AppComponent],
  entryComponents: [LoginDialogComponent, SignupDialogComponent]
})
export class AppModule { }
