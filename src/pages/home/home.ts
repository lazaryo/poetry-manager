import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

import { VerifyPage } from '../verify/verify';
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
    
    verifyPoems() {
        this.navCtrl.push(VerifyPage, {}, {animate: true, animation: 'wp-transition', direction: 'forward'});
    }
    
    manageUsers() {
        this.navCtrl.push(UsersPage, {}, {animate: true, animation: 'wp-transition', direction: 'forward'});
    }
}
