import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import { Amplify } from 'aws-amplify';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { FileComponent } from './file/file.component';

import awsconfig from '../aws-exports';

Amplify.configure(awsconfig);


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AmplifyAuthenticatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  
}
