import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

import { SinglePage } from '../single/single';
import { UserPage } from '../user/user';

@IonicPage()
@Component({
    selector: 'page-verify',
    templateUrl: 'verify.html',
})
export class VerifyPage {
    poemsRef: any;
    poems: Observable<any>;
    verifyP: any;
    removeP: any;
    isVerified: any = false;
    
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public afAuth: AngularFireAuth,
        public db: AngularFireDatabase,
        public toastCtrl: ToastController,
        public alertCtrl: AlertController) {

                    this.poemsRef = db.list('poems');
        // Use snapshotChanges().map() to store the key
        this.poems = this.poemsRef.snapshotChanges().pipe(
          map(changes => 
            changes['map'](c => ({ key: c.payload.key, ...c.payload.val() }))
          )
        );
        }
    
    ionViewDidLoad() {
        console.log('ionViewDidLoad VerifyPoemsPage');
    }
    
    verifyPoem(poem) {
        let confirm = this.alertCtrl.create({
            title: 'Verify ' + poem.title + '?',
            message: 'Once verified, ' + poem.title + ' by ' + poem.author + ' can been seen by everyone in the app.',
            buttons: [
                {
                    text: 'Cancel',
                    handler: () => {
                        console.log('You have changed your mind.');
                    }
                },
                {
                    text: 'Verify',
                    handler: () => {
                        this.notificationToast(poem.title + ' by ' + poem.author + ' has been verified.');
                        this.verifyP = this.db.object('/poems/' + poem.key);
                        this.verifyP.update({ verified: true });
                    }
                }
            ]
        });
            
        confirm.present();
    }
    
    removePoem(poem) {
        let confirm = this.alertCtrl.create({
            title: 'Remove from database?',
            message: 'Once removed, ' + poem.title + ' by ' + poem.author + ' will no longer be in the Poetry App. This cannot be undone.',
            buttons: [
                {
                    text: 'Cancel',
                    handler: () => {
                        console.log('You have changed your mind.');
                    }
                },
                {
                    text: 'Delete',
                    handler: () => {
                        this.notificationToast(poem.title + ' by ' + poem.author + ' has been deleted.');
                        this.removeP = this.db.object('/poems/' + poem.key);
                        this.removeP.remove();
                    }
                }
            ]
        });
        confirm.present();
    }
    
    viewPoem(poem) {
        console.log(poem);
        this.navCtrl.push(SinglePage, poem);
    }
    
    notificationToast(message) {
        const toast = this.toastCtrl.create({
            message: message,
            showCloseButton: true,
            closeButtonText: 'Ok',
            position: 'top'
        });
        toast.present();
    }
    
    authorPage(authorKey) {
        this.db.object('users/' + authorKey).valueChanges().subscribe(response => {
            console.log("Author Key:", authorKey);
            console.log("Response:", response);
            response["key"] = authorKey;
            
            this.navCtrl.push(UserPage, response, {animate: true, animation: 'wp-transition', direction: 'forward'});
        });
    }
}
