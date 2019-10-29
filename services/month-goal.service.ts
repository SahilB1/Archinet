import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection,
AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MonthGoalService {

  goalValueCollection: AngularFirestoreCollection<any>;
  goalValueDoc: AngularFirestoreDocument<any>;
  goalValue: Observable<any>;

  constructor(private afs: AngularFirestore) {
    this.goalValueCollection = this.afs.collection('MonthGoal')
  }

  getAmount(id: string): Observable<any> {
    this.goalValueDoc = this.afs.doc(`MonthGoal/${id}`);
    this.goalValue = this.goalValueDoc.snapshotChanges().map(action => {
      if(action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data();
        data.id = action.payload.id;
        return data;
      }
    })
    return this.goalValue;
  }

}
