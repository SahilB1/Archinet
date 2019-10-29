import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection,
AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RatingsService {
  ratingsCollection: AngularFirestoreCollection<any>;
  ratingDoc: AngularFirestoreDocument<any>;
  ratings: Observable<any[]>;
  rating: Observable<any>;
  dateTime: string;

  constructor(private afs: AngularFirestore) {
    this.ratingsCollection = this.afs.collection('items');
   }

   getRatings(id: string): Observable<any[]> {
     // Get ratings with the id
     this.ratings = this.ratingsCollection.doc(id).collection('ratings').snapshotChanges()
      .map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data();
          data.id = action.payload.doc.id;
          return data;
        })
      })
      return this.ratings;
   }

   renderTime() {
     var timeratinged = new Date();
     var currentHour;
     if(timeratinged.getHours() > 12) {
       currentHour = (timeratinged.getHours() - 12) + ":" + timeratinged.getMinutes() + "p.m.";
     } else {
       currentHour = timeratinged.getHours() + ":" + timeratinged.getMinutes() + "a.m.";
     }
     this.dateTime = ("Date: " + ( (timeratinged.getMonth()+1) + "/" + timeratinged.getDate() + "/" + timeratinged.getFullYear()) + " |  Time: " + currentHour).toString();
     return this.dateTime;
   }

}
