import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

import { SinglePage } from '../single/single';

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
    
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public afAuth: AngularFireAuth,
        public db: AngularFireDatabase,
        public alertCtrl: AlertController) {

            this.poemsRef = db.list('poems');
            // Use snapshotChanges().map() to store the key
            this.poems = this.poemsRef.snapshotChanges().pipe(
                map(changes => {
                    changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
                })
            );
        }
    
    ionViewDidLoad() {
        console.log('ionViewDidLoad VerifyPoemsPage');
    }
    
    verifyPoem(poem) {
        console.log('Poem ID: ' + poem.key);
        console.log(poem.title + ' by ' + poem.author + ' has been verified.');
        console.log('Verified: ' + !poem.verified);
        
        this.verifyP = this.db.object('/poems/' + poem.key);
        this.verifyP.update({ verified: true });
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
                        console.log(poem.title + ' by ' + poem.author + ' has been deleted.');
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

}
