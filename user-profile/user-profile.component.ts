import { Component, OnInit, Input } from '@angular/core';
import { QueryService } from '../services/query.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MonthGoalService } from '../services/month-goal.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {



  popup: HTMLElement;
  goalValue: HTMLInputElement;
  timeLine: HTMLInputElement;
  firstName: string;
  lastName: string;
  userGoalString: string = "You Haven't Set A Goal Yet";
  init: boolean = false;
  id: string;
  loggedInUser: string;
  email: string;
  userGoogleLogin: boolean = false;

  constructor(
    private query: QueryService,
    private router: Router,
    private authService: AuthService,
    private goalService: MonthGoalService,
  ) { }

  /*this.goalService.getAmount('UserGoal').subscribe(goalAmount => {
    goalAmount.Value = this.userGoalString;
    console.log(goalAmount.Value);
  });*/

  setGoal() {
    this.popup = document.getElementById("popupDiv");
    //console.log(this.popup);
    this.popup.setAttribute("style", "display: block;");
    console.log(this.popup);
  }

  exitPopup() {
    this.popup = document.getElementById("popupDiv");
    this.goalValue = <HTMLInputElement>document.getElementById("goalValue");
    this.timeLine = <HTMLInputElement>document.getElementById("durationValue");
    this.popup.setAttribute("style", "display: none;");
    //this.userGoalNumber = parseFloat(this.goalValue.value);
    if(this.goalValue.value.toString().substring(0,1) == "$") {
      this.userGoalString = this.goalValue.value;
    } else {
      this.userGoalString = "$" + this.goalValue.value;
    }
    this.goalService.getAmount('UserGoal').subscribe(goalAmount => {
      this.init = true;
      console.log(goalAmount.Value);
    });
  }

  quitPopup() {
    this.popup = document.getElementById("popupDiv");
    this.goalValue = <HTMLInputElement>document.getElementById("goalValue");
    this.timeLine = <HTMLInputElement>document.getElementById("durationValue");
    this.popup.setAttribute("style", "display: none;");
  }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if(auth.displayName != null) {
        this.userGoogleLogin = true;
        this.firstName = auth.displayName.substring(0, auth.displayName.indexOf(" "));
        this.lastName = auth.displayName.substring(auth.displayName.indexOf(" ") + 1);
      } else {
        this.email = auth.email;
      }
    });

    document.addEventListener("keydown", (e) => {
        if(e.key == "Enter") {
          this.exitPopup();
        }
      });

  }

}
