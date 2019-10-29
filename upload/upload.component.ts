import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AngularFirestore, AngularFirestoreCollection,
AngularFirestoreDocument } from 'angularfire2/firestore';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

   itemsCollection: AngularFirestoreCollection<any>;
   test: any;
   file: any;
   description: any;
   contact: any;
   name: any;
   type: any;
   time: any;
   email: any;
   storageRef: any;
   imageName: any;
   pic: HTMLImageElement;
   db: any;
   snap: any;
   picURL: any;
   price: any;
   retail: any;
   suggestedPrice: any;
   success: HTMLElement;
   displayName: string;
   userGoogleLogin: boolean = false;
   photo: string;
   location: any;
   imageURL: any;


  constructor(
    private afs: AngularFirestore,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private http: HttpClient
  ) {

  }


  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      console.log(auth);
      this.email = auth.email;
      if(auth.displayName != null) {
        this.userGoogleLogin = true;
        this.displayName = auth.displayName;
        this.photo = auth.photoURL;
      } else {
        this.displayName = auth.email;
        this.photo = "";
      }
    });

    window.navigator.geolocation.getCurrentPosition(pos => {
    //sfbLkZYDUmZNeNGWUotA // app id
    //qyL-YtAjy_SRzWNoL4x-XA // app code
    this.http.get('https://us1.locationiq.com/v1/reverse.php?key=832a21a69202bb&lat='+pos.coords.latitude+'&lon='+pos.coords.longitude+'&format=json').subscribe(data => {
      //console.log(data.address.postcode);
      this.location = data;
    })
})

  var getDate = new Date();
  this.time = getDate;
  console.log(this.time);

  }

  getSuggestedPrice() {
    if(typeof this.retail != "undefined" && this.retail < 61) {

      if(this.retail < 21) {
        var showPrice = parseFloat(this.retail) * .10;
      }
      else if(this.retail < 41 && this.retail > 20) {
        var showPrice = parseFloat(this.retail) * .11;
      }
      else if(this.retail < 61 && this.retail > 40) {
        var showPrice = parseFloat(this.retail) * .12;
      }
      this.suggestedPrice = (Math.round(showPrice * 100) / 100).toString();
      var dotIndex = this.suggestedPrice.indexOf(".");
      console.log(this.suggestedPrice.length);
      if(this.suggestedPrice.charAt(dotIndex + 2) == "" && this.suggestedPrice.length == 3) {
        this.suggestedPrice += "0";
      }
      if(dotIndex == -1) {
        this.suggestedPrice += ".00";
      }
      console.log(this.suggestedPrice);
    }
    else if(this.retail > 60) {
      this.suggestedPrice = "Must be under $61";
    }
  }

  makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

  onFileChange(event) {

    this.file = event.target.files[0];
    this.imageName = this.makeid(20) + this.file.name.substring(this.file.name.indexOf('.'));
    this.storageRef = firebase.storage().ref(this.imageName);
    this.pic = <HTMLImageElement>document.getElementById("image");
    var pic = this.pic;


    this.storageRef.put(this.file).then((snapshot) => {
      snapshot.ref.getDownloadURL().then((downloadURL) => {
        pic.style.display = "inline";
        pic.src = downloadURL;
      });
      this.snap = snapshot;
    });
  }

  upload() {

    if(this.pic && this.retail < 61) {
      this.snap.ref.getDownloadURL().then((downloadURL) => {
          this.imageURL = downloadURL;
          var getDate = new Date();
          this.time = getDate;

          /*console.log("Image url: " + this.imageURL);
          console.log("Download url: " + downloadURL);*/
          this.afs.collection('items').add({
          'description': this.description,
          'price': "$" + this.price + " / per day",
          'name': this.name,
          'image': this.imageURL,
          'type': this.type.toLowerCase(),
          'userName': this.displayName,
          'photo': this.photo,
          'location': this.location,
          'contact': this.contact,
          'time': this.time,
          'email': this.email,
          'count': 1,
        });
          this.description = "";
          this.price = "";
          this.name = "";
          this.type = "";
          this.pic.src = "";
          this.pic.style.display = "none";
          this.flashMessage.show('Upload Successful!', {
             cssClass: 'alert-success', timeout: 4000
           });
         });
    }
    else {
      this.flashMessage.show('Upload Error', {
         cssClass: 'alert-danger', timeout: 4000
       });
    }
  }

}
