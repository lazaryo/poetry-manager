import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { VerifyPage } from '../pages/verify/verify';
import { PoemsPage } from '../pages/poems/poems';
import { UsersPage } from '../pages/users/users';
import { LoginPage } from '../pages/login/login';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = HomePage;

    pages: Array<{title: string, component: any}>;
    hasUser: any;

    constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public afAuth: AngularFireAuth, public db: AngularFireDatabase) {
        this.initializeApp();

        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Home', component: HomePage },
            { title: 'Verified Poems', component: PoemsPage },
            { title: 'Verify Poems', component: VerifyPage },
            { title: 'Manage Users', component: UsersPage },
        ];
        
        this.checkingUser();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    openPage(page) {
        this.nav.setRoot(page.component, {userID: window.localStorage.getItem('currentuser'), provider: window.localStorage.getItem('provider')});
    }
    
    checkingUser() {
        this.afAuth.authState.subscribe(res => {
            if (res && res.uid) {
                this.hasUser = true
            } else {
                this.hasUser = false
                this.nav.setRoot(LoginPage);
            }
        });
    }
    
    getProvider() {
        this.afAuth.authState.subscribe((user) => {
            console.log(user);
        });
    }
    
    logout() {
        window.localStorage.removeItem('currentuser');
        window.localStorage.removeItem('provider');
        this.afAuth.auth.signOut();
        this.nav.setRoot(LoginPage, {}, {animate: true, animation: 'wp-transition', direction: 'forward'});
    }
}
