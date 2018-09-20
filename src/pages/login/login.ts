import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginProvider } from '../../providers/login/login';

import { HomePage } from '../home/home';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})

export class LoginPage {
    email: any;
    password: any;
    
    constructor(public navCtrl: NavController, public navParams: NavParams, public afAuth: AngularFireAuth, public db: AngularFireDatabase, public _lp: LoginProvider, public toastCtrl: ToastController) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
    }
    
    loggedInToast() {
        const toast = this.toastCtrl.create({
            message: 'Logged in successfully',
            showCloseButton: true,
            closeButtonText: 'Ok',
            position: 'top'
        });
        toast.present();
        this.navCtrl.setRoot(HomePage, {}, {animate: true, animation: 'wp-transition', direction: 'forward'});
    }
    
    loginWithEmail() {
        console.log('Logging in with an Email');
        this._lp.signInWithEmail(this.email, this.password);
        this.loggedInToast();
    }
}
