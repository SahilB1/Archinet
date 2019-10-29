import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection,
AngularFirestoreDocument } from 'angularfire2/firestore';
import { DomSanitizer } from '@angular/platform-browser';
import {  Router, ActivatedRoute, Params } from '@angular/router';
import { ItemService } from '../services/item.service';
import { RatingsService } from '../services/ratings.service';
import { AuthService } from '../services/auth.service';
import { Item } from '../models/item';


@Component({
  selector: 'app-item-description',
  templateUrl: './item-description.component.html',
  styleUrls: ['./item-description.component.css']
})
export class ItemDescriptionComponent implements OnInit {
  id: string;
  item: Item;
  message: string;
  dateTime: any;
  ratings: any[];
  user: any;
  userImage: any;
  dates: any[];
  showCalendar: boolean = false;
  inStock: boolean = true;
  count: any;
  ownerAuth: boolean = false;
  currentUserEmail: any;
  sms: any;


  constructor(
    private itemService: ItemService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private afs: AngularFirestore,
    private ratingsService: RatingsService,
    private authService: AuthService,
    private sanitizer:DomSanitizer
  ) { }

  ngOnInit() {

    /*console.log(document.getElementById("calendar_dates"));
    this.dates = [];
    console.log(this.dates);

    var calendar_dates = document.getElementById("calendar_dates");

    calendar_dates.addEventListener("click", (event) => {
      var self = this;
      var target = event.target || event.srcElement;
      console.log(target.innerHTML);
      this.dates.push(target.innerHTML);
      console.log(this.dates);
      target.setAttribute("style", "background-color: #FF8000; border-radius: 50px");
    })*/


    this.authService.getAuth().subscribe(auth => {
    if(auth) {
      this.currentUserEmail = auth.email;
      if(auth.displayName != null) {
        this.user = auth.displayName;
        this.userImage = auth.photoURL;
      } else {
        this.user = auth.email;
      }
    }
    });

    this.id = this.activeRoute.snapshot.params['id'];

    this.itemService.getItem(this.id).subscribe(item => {
      this.item = item;
      this.sms = item.contact;
      this.count = item.count;
      if(this.currentUserEmail == this.item.email) {
        this.ownerAuth = true;
      }
    })

    this.ratingsService.getRatings(this.id).subscribe(ratings => {
      for(var i = 0; i < ratings.length - 1; i++) {
          for(var j = i; j < ratings.length; j++) {
            if(ratings[j].time < ratings[i].time) {
              var third = ratings[i];
              ratings[i] = ratings[j];
              ratings[j] = third;
            }
          }
      }
      this.ratings = ratings;
      return ratings;
    })

    console.log(this.item.email);
    console.log(this.currentUserEmail);


    console.log(this.sanitize(this.item.contact));



  }

  sanitize(url:string){
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  test() {
    console.log(this.sanitize(this.item.contact));
  }


  addRating() {
    this.dateTime = Date.now();
    this.afs.collection('items').doc(this.id).collection('ratings').add({
      'rating': this.message,
      'time': this.dateTime,
      'user': this.user,
      'userImage': this.userImage
    });
    this.message = '';
  }

  delete() {
    if(window.confirm("Warning, are you sure you want to delete: " + this.item.name)) {
      this.afs.collection('items').doc(this.id).delete().then(() => {
        console.log("item deleted");
      })
    }
    this.router.navigate([`/user-account`]);
  }

  checkout() {
    if(this.count > 0) {
      this.afs.collection('items').doc(this.id).update({count: (this.count - 1)});
      console.log(this.count);
      this.count--;
      if(this.count == 0) {
        this.inStock = false;
      }
    }
  }










}
