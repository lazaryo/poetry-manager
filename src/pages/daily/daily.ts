import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';

@IonicPage()
@Component({
    selector: 'page-daily',
    templateUrl: 'daily.html',
})
export class DailyPage {
    messages = {
        local: '',
        server: ''
    };

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public toast: ToastController,
        public alert: AlertController,
        public db: AngularFireDatabase) {
            
        this.db.object('daily').valueChanges().subscribe(response => {
            this.messages.server = response['message'];
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad DailyPage');
    }
    
    saveDaily() {
        console.log('saving daily message');
        
        if (this.messages.local == '' || this.messages.local == null) {
            this.dailyAlert('Error', 'Daily Message is empty.', 'Ok', false);
        } else if (this.messages.local == this.messages.server) {
            this.dailyToast('Daily Message has not changed.');
        } else {
            this.dailyAlert('Daily Message', 'Save the new Daily Message?', 'Confirm', true);
        }
    }
    
    dailyToast(message) {
        const toast = this.toast.create({
            message: message,
            showCloseButton: true,
            closeButtonText: 'Ok',
            position: 'top'
        });
        toast.present();
    }
    
    dailyAlert(title, message, confirmText, update) {
        let confirm = this.alert.create({
            title: title,
            message: message,
            buttons: [
                {
                    text: 'Cancel',
                    handler: () => {
                        console.log('You have changed your mind.');
                    }
                },
                {
                    text: confirmText,
                    handler: () => {
                        if (update) {
                            let dailyRef = this.db.object('daily');
                            dailyRef.update({message: this.messages.local}).then(() => {
                                console.log('saved new message');
                            });
                        } else {
                            console.log(message);
                        }
                    }
                }
            ]
        });
        confirm.present();
    }
    
    sendNotif() {
        console.log('sending notification...');
    }

}
