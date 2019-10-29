import { Component, OnInit, Input } from '@angular/core';
import { QueryService } from '../services/query.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { ItemService } from '../services/item.service';
import { Item } from '../models/Item';



@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {

  constructor(
    private query: QueryService,
    private router: Router,
    private authService: AuthService,
    private itemService: ItemService,
    private http: HttpClient
  ) {
  }

  id: string;
  firstName: string;
  lastName: string;
  isLoggedIn: boolean;
  items: Item[];
  item: Item;
  showResults: boolean = false;
  clicked: boolean = false;
  filteredArray: Item[] = [];

  searchQuery: string;
  locationQuery: string;

  searchItem: HTMLInputElement;
  searchLocation: HTMLInputElement;
  results: HTMLElement;
  images: HTMLCollectionOf<Element>;
  cards: HTMLCollectionOf<Element>;
  searchResultsHeader: HTMLElement;
  rentLink: HTMLCollectionOf<Element>;
  rentLinkDetails: HTMLCollectionOf<Element>;
  rentLinkDiv: HTMLCollectionOf<Element>;
  price: HTMLCollectionOf<Element>;
  homeScreenSearchItem: string;
  zipcodeDesired: any;
  result: any;

  type: string;

  ngOnInit() {
    window.navigator.geolocation.getCurrentPosition(pos => {
    //sfbLkZYDUmZNeNGWUotA // app id
    //qyL-YtAjy_SRzWNoL4x-XA // app code
    this.http.get('https://us1.locationiq.com/v1/reverse.php?key=832a21a69202bb&lat='+pos.coords.latitude+'&lon='+pos.coords.longitude+'&format=json').subscribe(data => {

    })
})
    this.authService.getAuth().subscribe(auth => {
      console.log(auth);
      if(auth) {
        this.isLoggedIn = true;
        if(auth.displayName != null) {
          this.firstName = auth.displayName.substring(0, auth.displayName.indexOf(" "));
          this.lastName = auth.displayName.substring(auth.displayName.indexOf(" ") + 1);
        } else {
          this.firstName = auth.email;
          /*this.authService.getUsers().subscribe(users => {
            for(int i = 0; i < users.length; i++) {
              if(users[i].email == auth.email) {
                console.log(users[i].firstName);
                console.log(users[i].lastName);
              }
            }
          })*/
        }
      } else {
        this.isLoggedIn = false;
      }
    });

    this.searchItem = <HTMLInputElement>document.getElementById("itemSearchInput");
    this.searchLocation = <HTMLInputElement>document.getElementById("locationSearchInput");
    this.results = <HTMLElement>document.getElementById("searchResults");
    this.searchResultsHeader = <HTMLElement>document.getElementById("searchResultsHeader");

    //console.log(this.query.searchForItem());


    document.addEventListener("keydown", (e) => {
        if(e.key == "Enter") {
          this.search();
        }
      });

    if(this.query.searchForItem() == "all" && (this.query.searchForLocation() == "" || !this.query.searchForLocation())) {
        this.searchItem.value = this.query.searchForItem();
        this.searchQuery = this.query.searchForItem();
        this.searchQuery = this.query.searchForItem();
        this.search();
        this.searchItem.value = "";
      }
    else if(this.query.searchForItem() == "all" && this.query.searchForLocation().length > 0) {
      this.searchItem.value = this.query.searchForItem();
      this.searchLocation.value = this.query.searchForLocation();
      this.searchQuery = this.query.searchForItem();
      this.locationQuery = this.query.searchForLocation();
      this.searchQuery = this.query.searchForItem();
      this.locationQuery = this.query.searchForLocation();
      this.search();
      this.searchItem.value = "";
      this.searchLocation.value = "";
    }
    else if(this.query.searchForItem().length > 0 && (this.query.searchForLocation() == "" || !this.query.searchForLocation())) {
          this.searchItem.value = this.query.searchForItem();
          this.searchQuery = this.query.searchForItem();
          this.searchQuery = this.query.searchForItem();
          this.search();
          this.searchItem.value = "";
        }
    else if(this.query.searchForItem().length > 0 && this.query.searchForLocation().length > 0) {
      this.searchItem.value = this.query.searchForItem();
      this.searchLocation.value = this.query.searchForLocation();
      this.searchQuery = this.query.searchForItem();
      this.locationQuery = this.query.searchForLocation();
      this.searchQuery = this.query.searchForItem();
      this.locationQuery = this.query.searchForLocation();
      this.search();
      this.searchItem.value = "";
      this.searchLocation.value = "";
    }


  }

  signOut() {
    this.authService.logout();
    this.router.navigate([`/`]);
  }

  returnHome() {
    this.router.navigate([`/`]);
    window.location.reload();
  }

  search() {
    this.filteredArray = []
    this.query.getSearchTerm(this.searchQuery);
    this.query.getSearchLocation(this.locationQuery);
    this.clicked = true;
    this.showResults = true;

    this.itemService.getItems().subscribe(retrievedItems => {
      for(var i = 0; i < retrievedItems.length; i++) {
        if(retrievedItems[i].type == this.searchQuery.toLowerCase() && retrievedItems[i].location.address.postcode == this.locationQuery) {
          this.filteredArray.push(retrievedItems[i]);
        }
        else if(retrievedItems[i].type == this.searchQuery.toLowerCase() && (this.locationQuery == "" || !this.locationQuery)) {
          this.filteredArray.push(retrievedItems[i]);
        }
        else if(this.searchQuery.toLowerCase() == "all" && (this.locationQuery == "" || !this.locationQuery)) {
          this.filteredArray.push(retrievedItems[i]);
        }
        else if(this.searchQuery.toLowerCase() == "all" && this.locationQuery == retrievedItems[i].location.address.postcode) {
          this.filteredArray.push(retrievedItems[i]);
        }
      }
      if(this.filteredArray.length > 0) {
        this.items = this.filteredArray;
        this.filteredArray = [];
      } else {
        this.showResults = false;
      }
    });

  }

}
