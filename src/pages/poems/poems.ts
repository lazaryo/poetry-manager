import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SinglePage } from '../single/single';

@IonicPage()
@Component({
    selector: 'page-poems',
    templateUrl: 'poems.html',
})
export class PoemsPage {
    poems: Observable<any>;
    poemsRef: any;
    
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public afAuth: AngularFireAuth,
        public db: AngularFireDatabase,
        public alertCtrl: AlertController) {
            
        this.poemsRef = db.list('poems');
        // Use snapshotChanges().map() to store the key
        this.poems = this.poemsRef.snapshotChanges().pipe(
          map(changes => 
            changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
          )
        );
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad VerifiedPage');
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
                        var ref = this.db.object('/poems/' + poem.key);
                        ref.remove();
                    }
                }
            ]
        });
        confirm.present();
    }
    
    revokePoem(poem) {
        let confirm = this.alertCtrl.create({
            title: 'Revoke verification?',
            message: 'Once revoked, ' + poem.title + ' by ' + poem.author + ' will have to be verified again to show in the Poetry App.',
            buttons: [
                {
                    text: 'Cancel',
                    handler: () => {
                        console.log('You have changed your mind.');
                    }
                },
                {
                    text: 'Revoke',
                    handler: () => {
                        console.log(poem.title + ' by ' + poem.author + ' has been revoked.');
                        var ref = this.db.object('/poems/' + poem.key);
                        ref.update({ verified: false });
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

