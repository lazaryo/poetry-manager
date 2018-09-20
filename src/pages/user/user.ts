import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';

@IonicPage()
@Component({
    selector: 'page-user',
    templateUrl: 'user.html',
})
export class UserPage {
    data: any;
    name: any;
    cuID: any;
    cu = {
        id: '',
        admin: false,
        owner: false,
        mod: false,
    }

    constructor(public navCtrl: NavController, public navParams: NavParams, public _af: AngularFireDatabase, public afAuth: AngularFireAuth) {
        this.data = this.navParams.data;
        
        this.cuID = this.afAuth.auth.currentUser.uid;
        this._af.object('users/' + this.cuID).valueChanges().subscribe(response => {
            this.cu.id = this.cuID;
            this.cu.admin = response.admin;
            this.cu.owner = response.owner;
            this.cu.mod = response.mod;
            console.log(this.cu);
        })
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad UserPage');
        this.name = this.data.displayName;
    }

}
