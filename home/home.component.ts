import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { QueryService } from '../services/query.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  searchItem: string;
  itemLocation: string;
  retail: any;
  item: HTMLInputElement;
  location: HTMLInputElement;
  retailPrice: HTMLInputElement;
  suggestedPrice: any;
  index: number = 0;
  index2: number = 0;

  constructor(private router: Router, private query: QueryService) { }

  ngOnInit() {
    this.item = <HTMLInputElement>document.getElementById("searchItem");
    this.location = <HTMLInputElement>document.getElementById("searchZip");
    this.retailPrice = <HTMLInputElement>document.getElementById("retailPriceInput");


    document.addEventListener("keydown", (e) => {
        if(e.key == "Enter") {
          this.search();
        }
      });


    /*document.addEventListener("scroll", (e) => {
      var navbar = document.getElementById("navbar");
      var navLinks = document.getElementsByClassName("links");
      var logo = <HTMLImageElement>document.getElementById("nav-logo");
      if(window.scrollY > 100) {
        navbar.classList.add("bg-secondary");
        for(var i = 0; i < navLinks.length; i++) {
          navLinks[i].classList.remove("nav-link-black");
          navLinks[i].classList.add("nav-link-white");
        }
        logo.src = "../assets/ArchinetNewWhite.png"
      } else {
        navbar.classList.remove("bg-secondary");
        for(var i = 0; i < navLinks.length; i++) {
          navLinks[i].classList.add("nav-link-black");
          navLinks[i].classList.remove("nav-link-white");
        }
        logo.src = "../assets/ArchinetNewBlack.png"
      }
    })*/

    /*var location = document.getElementById("searchZip");
    setTimeout(() => {
      location.classList.add("anim-typewriter");
      location.classList.remove("hidden");

    }, 3000);*/

    /*var items = ["camera", "drone", "skateboard", "bike", "suit", "dress", "grill", "drill", "speaker", "chair", "table", "monitor"];
    var places = ["New York City", "Chicago", "Seattle", "San Francisco", "Minneapolis", "Los Angeles", "Atlanta", "Miami", "Detroit"]
    var chars = items[this.index].split('');
    var chars2 = places[this.index2].split('');

    var container = <HTMLInputElement>document.getElementById("searchItem");
    var container2 = <HTMLInputElement>document.getElementById("searchZip");

    var i = 0;
    var j = 0;*/
    /*setInterval(() => {
        if (i < chars.length) {
            container.placeholder += chars[i];
            i++;
        } else {
            i = 0;
            if(this.index < items.length - 1) {
              this.index++;
            } else {
              this.index = 0;
            }
            container.placeholder = "";
            chars = items[this.index].split('');
        }
    }, 300);


    var j = 0;
    setInterval(() => {
        if (j < chars2.length) {
            container2.placeholder += chars2[j];
            j++;
        } else {
            j = 0;
            if(this.index2 < places.length - 1) {
              this.index2++;
            } else {
              this.index2 = 0;
            }
            container2.placeholder = "";
            chars2 = places[this.index2].split('');
        }
    }, 300);*/


}

  storeQuery() {
    this.query.getSearchTerm(this.searchItem);
  }

  search() {
    this.query.getSearchTerm(this.searchItem);
    this.query.getSearchLocation(this.itemLocation);
    this.router.navigate([`/user-account`]);
  }

  loginLink() {
    this.router.navigate([`/login`]);
    window.location.reload();
  }

  registerLink() {
    this.router.navigate([`/signup`]);
    window.location.reload();
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

  getPrice() {
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

}
