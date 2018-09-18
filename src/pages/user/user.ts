import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-user',
    templateUrl: 'user.html',
})
export class UserPage {
    data: any;
    name: any;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.data = this.navParams.data;
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad UserPage');
        this.name = this.data.displayName;
    }

}
