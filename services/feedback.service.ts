import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection,
AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FeedbackService {
  postsCollection: AngularFirestoreCollection<any>;
  postDoc: AngularFirestoreDocument<any>;
  posts: Observable<any[]>;
  post: Observable<any>;
  dateTime: string;

  constructor(private afs: AngularFirestore) {
    this.postsCollection = this.afs.collection('posts');
   }

   getMessages(): Observable<any[]> {
     // Get posts with the id
     this.posts = this.postsCollection.snapshotChanges()
      .map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data();
          data.id = action.payload.doc.id;
          return data;
        })
      })
      return this.posts;
   }

   getpost(id: string): Observable<any> {
     this.postDoc = this.afs.doc<any>(`posts/${id}`);
     this.post = this.postDoc.snapshotChanges().map(action => {
       if(action.payload.exists === false) {
         return null;
       } else {
         const data = action.payload.data();
         data.id = action.payload.id;
         return data;
       }
     })
     return this.post;
   }

   renderTime() {
     var timePosted = new Date();
     var currentHour;
     if(timePosted.getHours() > 12) {
       currentHour = (timePosted.getHours() - 12) + ":" + timePosted.getMinutes() + "p.m.";
     } else {
       currentHour = timePosted.getHours() + ":" + timePosted.getMinutes() + "a.m.";
     }
     this.dateTime = ("Date: " + ( (timePosted.getMonth()+1) + "/" + timePosted.getDate() + "/" + timePosted.getFullYear()) + " |  Time: " + currentHour).toString();
     return this.dateTime;
   }

}
