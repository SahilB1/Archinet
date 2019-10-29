import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor() { }

  userInput: HTMLInputElement;
  messagesList: HTMLElement;
  userMessage: HTMLCollectionOf<Element>;

  ngOnInit() {
    this.userInput = <HTMLInputElement>document.getElementById("input");
    this.messagesList = <HTMLElement>document.getElementById("messagesList");

    document.addEventListener("keydown", (e) => {
        if(e.key == "Enter") {
          this.addMessage();
        }
      });
  }

  addMessage() {
    if(this.userInput.value.length > 0) {
      this.messagesList.innerHTML += "<p class='userMessage'>" + this.userInput.value + "</p>";
    }
      this.userMessage = document.getElementsByClassName("userMessage");
    for(var i in this.userMessage) {
      this.userMessage[i].setAttribute("style", "padding-bottom: 10px; background-color: #FF8B00; border-radius: 50px; padding: 20px; width: 60%; word-wrap: break-word;");
      this.userInput.value = "";
    }
  }

}
