import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';

@IonicPage()
@Component({
    selector: 'page-user',
    templateUrl: 'user.html',
})
export class UserPage {
    vUserId: any;
    name: any;
    cuID: any;
    data = {
        key: '',
        admin: false,
        owner: false,
        profilePicture: '',
        displayName: '',
        verifiedUser: false
    }
    
    cu = {
        key: '',
        admin: false,
        owner: false,
    }
    adminToggle = false;

    constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public toastCtrl: ToastController, public _af: AngularFireDatabase, public afAuth: AngularFireAuth) {
        this.vUserId = this.navParams.data.key;
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad UserPage');
        this.name = this.navParams.data.displayName;
        
        this.data.key = this.navParams.data.key;
        this.data.profilePicture = this.navParams.data.profilePicture;
        this.data.displayName = this.navParams.data.displayName;
        this.data.admin = this.navParams.data.admin;
        this.data.owner = this.navParams.data.owner;
        this.data.verifiedUser = this.navParams.data.verifiedUser;
        
        this.updateUserInfo();
    }
    
    updateUserInfo() {
        console.log("Navigation Parameter Data:", this.navParams.data);
        
        this._af.object('users/' + this.vUserId).valueChanges().subscribe(response => {
            this.data.key = this.vUserId;
            this.data.profilePicture = response['profilePicture'];
            this.data.displayName = response['displayName'];
            this.data.admin = response['admin'];
            this.data.owner = response['owner'];
            this.data.verifiedUser = response['verifiedUser'];
        });
        
        this.cuID = this.afAuth.auth.currentUser.uid;
        this._af.object('users/' + this.cuID).valueChanges().subscribe(response => {
            this.cu.key = this.cuID;
            this.cu.admin = response['admin'];
            this.cu.owner = response['owner'];
        });
    }
    
    changeAdminStatus(cUserD, userD, status) {
        if (status) {
            this.adminAlert('Are you sure you want to make ' + userD.displayName + ' an Admin?', userD.key, userD.displayName, status);
        } else {
            this.adminAlert('Are you sure you want to remove the Admin role from ' + userD.displayName + '?', userD.key, userD.displayName, status);
        }

        this.updateUserInfo();
    }
        
    changeUserVerification(cUserD, userD, status) {
        if (status) {
            this.verifyAlert('Are you sure?', userD.key, userD.displayName, status);
        } else {
            this.verifyAlert('Are you sure?', userD.key, userD.displayName, status);
        }

        this.updateUserInfo();
    }
    
    adminAlert(message, userKey, userName, status) {
        let alert = this.alertCtrl.create({
            title: 'Admin Status',
            message: message,
            buttons: [{
                text: 'Cancel',
                role: 'cancel',
                handler: () => {
                    console.log("You have changed your mind.");
                }
            }, {
                text: 'Confirm',
                handler: () => {
                    let ref = this._af.object('/users/' + userKey);
                    if (status) {
                        ref.update({admin: status});
                        this.updateUserInfo();
                        this.notificationToast(userName + " is now an Admin.");
                    } else {
                        ref.update({admin: status});
                        this.updateUserInfo();
                        this.notificationToast(userName + " is not an Admin anymore.");
                    }
                }
            }]
        });
        alert.present();
    }

    verifyAlert(message, userKey, userName, status) {
        let alert = this.alertCtrl.create({
            title: 'Verified Status',
            message: message,
            buttons: [{
                text: 'Cancel',
                role: 'cancel',
                handler: () => {
                    console.log("You have changed your mind.");
                }
            }, {
                text: 'Confirm',
                handler: () => {
                    let ref = this._af.object('/users/' + userKey);
                    if (status) {
                        ref.update({verifiedUser: status});
                        this.updateUserInfo();
                        this.notificationToast(userName + " has been verified.");
                    } else {
                        ref.update({verifiedUser: status});
                        this.updateUserInfo();
                        this.notificationToast(userName + "'s profile isn't verified anymore.");
                    }
                }
            }]
        });
        alert.present();
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
}
