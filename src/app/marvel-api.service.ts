import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import keys from ''

@Injectable({
  providedIn: 'root'
})
export class MarvelApiService {

  constructor(private http: HttpClient) {

   }
}
