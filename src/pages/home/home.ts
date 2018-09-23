import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

import { LoginPage } from '../login/login';
import { VerifyPage } from '../verify/verify';
import { PoemsPage } from '../poems/poems';
import { UsersPage } from '../users/users';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    forms: Observable<any[]>;
    daily: Observable<any>;
    message: any;

    constructor(public navCtrl: NavController, public afAuth: AngularFireAuth, public db: AngularFireDatabase) {
    }
    
    ionViewDidLoad() {
        console.log('ionViewDidLoad HomePage');
    }
    
    logout() {
        window.localStorage.removeItem('currentuser');
        window.localStorage.removeItem('provider');
        this.afAuth.auth.signOut();
        this.navCtrl.setRoot(LoginPage, {}, {animate: true, animation: 'wp-transition', direction: 'forward'});
    }
    
    verifiedPoems() {
        this.navCtrl.push(PoemsPage, {}, {animate: true, animation: 'wp-transition', direction: 'forward'});
    }
    
    verifyPoems() {
        this.navCtrl.push(VerifyPage, {}, {animate: true, animation: 'wp-transition', direction: 'forward'});
    }
    
    manageUsers() {
        this.navCtrl.push(UsersPage, {}, {animate: true, animation: 'wp-transition', direction: 'forward'});
    }
}
