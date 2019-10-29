import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  email: any;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit(email) {
    this.authService.resetPassword(email);
  }

}
