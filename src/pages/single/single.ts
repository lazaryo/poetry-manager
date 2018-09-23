import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';

import { UserPage } from '../user/user';

@IonicPage()
@Component({
    selector: 'page-single',
    templateUrl: 'single.html',
})
export class SinglePage {
    public title:any;
    public author:any;
    public formType:any;
    public lines:any;
    public key:any;
    public userID: any;
    
    constructor(public navCtrl: NavController, public navParams: NavParams, public _af: AngularFireDatabase) {
        console.log(this.navParams.data);
        
        this.title = navParams.data.title;
        this.author = navParams.data.author;
        this.formType = navParams.data.formType;
        this.lines = navParams.data.lines;
        this.key = navParams.data.key;
        this.userID = navParams.data.auid;
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad SinglePage');
    }
    
    authorPage(authorKey) {
        this._af.object('users/' + authorKey).valueChanges().subscribe(response => {
            console.log("Author Key:", authorKey);
            console.log("Response:", response);
            response["key"] = authorKey;
            
            this.navCtrl.push(UserPage, response, {animate: true, animation: 'wp-transition', direction: 'forward'});
        });
    }
}
