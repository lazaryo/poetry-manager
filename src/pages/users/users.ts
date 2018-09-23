import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

import { UserPage } from '../user/user';

@IonicPage()
@Component({
    selector: 'page-users',
    templateUrl: 'users.html',
})
export class UsersPage {
    profiles: any;
    profilesRef: any;
    
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public afAuth: AngularFireAuth,
        public db: AngularFireDatabase,
        public alertCtrl: AlertController) {
            
        this.profilesRef = db.list('users');
        // Use snapshotChanges().map() to store the key
        this.profiles = this.profilesRef.snapshotChanges().pipe(
            map(changes => 
                changes['map'](c => ({ key: c.payload.key, ...c.payload.val() }))
            )
        );
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad UsersPage');
    }
    
    viewUser(user) {
        this.navCtrl.push(UserPage, user);
    }
    
    providerColor(p) {
        if (p == 'email') {
            return true
        } else {
            return false
        }
    }

    verifiedColor(p) {
        if (p) {
            return true
        } else {
            return false
        }
    }

}
