import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { UserPage } from '../pages/user/user';
import { UsersPage } from '../pages/users/users';
import { PoemsPage } from '../pages/poems/poems';
import { SinglePage } from '../pages/single/single';
import { VerifyPage } from '../pages/verify/verify';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { LoginProvider } from '../providers/login/login';
import { LinesPipe } from '../pipes/lines.pipe';

export const firebaseConfig = {
    apiKey: "AIzaSyDFURqOVF-HF5AqFTWpurg8_VZXxr-ufWo",
    authDomain: "poetry-prototype.firebaseapp.com",
    databaseURL: "https://poetry-prototype.firebaseio.com",
    projectId: "poetry-prototype",
    storageBucket: "poetry-prototype.appspot.com",
    messagingSenderId: "289304009059"
};

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        UserPage,
        UsersPage,
        SinglePage,
        PoemsPage,
        LoginPage,
        VerifyPage,
        LinesPipe
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        AngularFireModule.initializeApp(firebaseConfig, 'verify'),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        UserPage,
        UsersPage,
        SinglePage,
        PoemsPage,
        VerifyPage,
        LoginPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        AngularFireDatabase,
        LoginProvider,
        LinesPipe
    ]
})
export class AppModule {}
