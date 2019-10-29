import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection,
  AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';


@Injectable()
export class AuthService {

  usersCollection: AngularFirestoreCollection<any>;
  users: any;
  data: any;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.usersCollection = this.afs.collection('users');
   }

  googleLogin(){
  return new Promise<any>((resolve, reject) => {
    let provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    this.afAuth.auth
    .signInWithPopup(provider)
    .then(res => {
      resolve(res),
      err => reject(err);
    });
  });
}

  signUp(email: string, password: string, fullName: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(email, password)
        .then(userData => {
          console.log(userData);
          userData.updateProfile({
            displayName: fullName,
            photoURL: ''
          }).then(() => {
            resolve(userData);
          });
        },
        err => reject(err));
    });
  }

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then(userData => resolve(userData),
        err => reject(err));
    });
  }

  getAuth() {
    return this.afAuth.authState.map(auth => auth);
  }

  getUsers(): Observable<any[]> {
    this.users = this.usersCollection.snapshotChanges()
     .map(changes => {
       return changes.map(action => {
         this.data = action.payload.doc.data();
         this.data.id = action.payload.doc.id;
         return this.data;
       })
     })
     return this.data;
  }

  resetPassword(email: string) {
    console.log(email);
    var auth = firebase.auth();
    return auth.sendPasswordResetEmail(email)
      .then(() => console.log("email sent"))
      .catch((error) => console.log(error))
  }

  logout() {
    this.afAuth.auth.signOut();
  }

}
