import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
/*import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';*/
/*import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
*/
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  error: boolean = false;
  init: boolean = true;

  constructor(private authService: AuthService, private router: Router) {


  }

  ngOnInit() {

    /*if(!window.location.hash) {
        window.location.hash = window.location.hash + 'loaded';
        window.location.reload();
    }*/

}

  googleLogin() {
    this.authService.googleLogin()
      .then(res => {
        this.router.navigate(['/user-account']);
      })
      .catch(err => {
        this.error = true;
      });
  }

  resetPassword(email) {
    this.authService.resetPassword(email);
  }

  log() {
    console.log("TEST");
  }


  onSubmit() {
      this.authService.login(this.email, this.password)
        .then(res => {
          this.router.navigate(['/user-account']);
        })
        .catch(err => {
          this.error = true;
        });
  }

}
