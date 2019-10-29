import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection,
AngularFirestoreDocument } from 'angularfire2/firestore';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  email: string;
  name: string;
  error: boolean = false;
  passwordOne: string;
  passwordTwo: string;
  confirmedPassword: string;
  passwordLength: boolean = false;
  errorMessage: string;

  constructor(private authService: AuthService, private afs: AngularFirestore, private router: Router) { }

  ngOnInit() {
    /*if(!window.location.hash) {
        window.location.hash = window.location.hash + '#loaded';
        window.location.reload();
    }*/
  }



  onSubmit() {
    if(this.passwordOne != this.passwordTwo) {
      if(this.passwordOne.length >= 6) {
        this.errorMessage = "Passwords Don't Match";
        this.error = true;
      }
      if(this.passwordOne.length < 6) {
        console.log("Not long enough");
        this.error = true;
        this.errorMessage = "Password Must Be At Least 6 Characters";
      }
    } else {
      if(this.passwordOne.length >= 6 && this.passwordTwo.length >= 6) {
        this.confirmedPassword = this.passwordOne;
        this.afs.collection('users').add({'email': this.email, 'name': this.name});
        this.authService.signUp(this.email, this.confirmedPassword, this.name)
          .then(res => {
            this.router.navigate([`/user-account`]);
          })
          .catch(err => {
            this.error = true;
            if(err.code == "auth/invalid-email") {
              this.errorMessage = "Invalid Email"
            }
            else if(err.code = "auth/email-already-in-use") {
              this.errorMessage = "Email Is Already In Use"
            }
            console.log(err);
          });
      } else {
        this.error = true;
        this.errorMessage = "Password Must Be At Least 6 Characters";
      }

    }

  }

}
