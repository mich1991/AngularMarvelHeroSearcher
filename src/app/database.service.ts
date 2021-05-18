import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MarvelApiService } from './marvel-api.service';
import { Hero } from './models/Hero';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  characters :Hero[] = []
  behaviorSubject = new BehaviorSubject<Hero[]>([]);

  constructor(private http: MarvelApiService) {
   this.fetchData()
   }

  fetchData(){
    this.http.behaviorSubject.subscribe((data: Hero[]) => {
      return this.characters.push(...data)})
  }
  clearData(){
    this.characters = []
  }


}
