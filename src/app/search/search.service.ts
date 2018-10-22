import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable()
export class SearchService {
  constructor(private http: HttpClient) {
  }

  search(toSearch: string) {
    console.log('searching');
    return this.http.get(`https://www.googleapis.com/customsearch/v1?key=AIzaSyCBM8ZUsYyJNdwKTKxoARTr673_8IaWKSo&cx=014557949845581334805:gdnqsazbu8i&q=${toSearch}`);
  }
} 