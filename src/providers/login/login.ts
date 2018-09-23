import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
//import AuthProvider = firebase.auth.AuthProvider;
import { AngularFireDatabase } from '@angular/fire/database';
//import { Observable } from 'rxjs';

@Injectable()
export class LoginProvider {
    public userF: firebase.User;
    public newUserInfo: any;
    
	constructor(public afAuth: AngularFireAuth, public db: AngularFireDatabase) {
		afAuth.authState.subscribe(user => {
			this.userF = user;
        });
	}
    
    setUserInfo(authInfo, userVars) {
        console.log(authInfo.uid);
        this.newUserInfo = {
            admin: false,
            anon: false,
            displayName: userVars.displayName,
            email: authInfo.email,
            verifiedEmail: false,
            profilePicture: userVars.profilePicture,
            provider: userVars.provider,
            verifiedUser: false
        };
        
        console.log(this.newUserInfo);
    }
    
    signInWithEmail(email, password) {
        console.log('Signing in with email');
        
        this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then(response => {
            console.log(response.user);
            
            let currentuser = response.user.uid
            window.localStorage.setItem('currentuser', currentuser);
            let provider = 'email';
            window.localStorage.setItem('provider', provider);
        })
        .catch(function(error) {
            // Handle Errors here.
            var errorMessage = error.message;
            console.log(errorMessage);
        });
    }
}