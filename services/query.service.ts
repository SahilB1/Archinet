import { Injectable } from '@angular/core';

@Injectable()
export class QueryService {
  searchTerm: string;
  searchLocation: string;

  constructor() {
  }

  getSearchTerm(searchTerm: string) {
      this.searchTerm = searchTerm;
      return searchTerm;
  }

  getSearchLocation(location: string) {
      this.searchLocation = location;
      return location;
  }

  searchForItem() {
    return this.searchTerm;
  }

  searchForLocation() {
    return this.searchLocation;
  }


}
