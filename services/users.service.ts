import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection,
  AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

@Injectable()
export class UsersService {

  usersCollection: AngularFirestoreCollection<any>;
  users: any;

  constructor(public afs: AngularFirestore) {
    this.usersCollection = this.afs.collection('users');
  }

}
