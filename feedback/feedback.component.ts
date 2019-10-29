import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection,
AngularFirestoreDocument } from 'angularfire2/firestore';
import { AuthService } from '../services/auth.service';
import { FeedbackService } from '../services/feedback.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

interface Post {
  message: string;
}

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  title: string;
  message: string;
  user: string;
  dateTime: any;
  finalMessage: string;
  sortedArray: string[] = [];

  postsCol: AngularFirestoreCollection<any>;
  posts: any[];

  constructor(private afs: AngularFirestore, private authService: AuthService, private router: Router, private feedbackService: FeedbackService) { }

  ngOnInit() {

    this.authService.getAuth().subscribe(auth => {
    if(auth) {
      if(auth.displayName != null) {
        this.user = auth.displayName;
      } else {
        this.user = auth.email;
      }
    }
  });

    this.postsCol = this.afs.collection("posts");


    this.feedbackService.getMessages().subscribe(messages => {
      for(var i = 0; i < messages.length - 1; i++) {
          for(var j = i; j < messages.length; j++) {
            if(messages[j].time < messages[i].time) {
              var third = messages[i];
              messages[i] = messages[j];
              messages[j] = third;
            }
          }

      }
      //console.log(messages);
      this.posts = messages;
      return messages;
    })
  }

  signOut() {
    this.authService.logout();
    this.router.navigate([`/`]);
  }

  addMessage() {
    if(this.message.length > 0) {

      this.dateTime = Date.now();
      this.afs.collection("posts").add({'message': this.message, 'user': this.user, 'time': this.dateTime});
      this.message = '';
      /*this.feedbackService.getMessages().subscribe(retrievedItems => {
        for(var i = 0; i < retrievedItems.length; i++) {
          console.log(retrievedItems[i].postNumber);
          if(retrievedItems[i].postNumber == i) {

            this.sortedArray.push(retrievedItems[i]);
          }
      });
      this.posts = this.sortedArray;
      this.message = '';
    }*/

  }
}




}
