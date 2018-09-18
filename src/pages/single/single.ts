import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';

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

}
