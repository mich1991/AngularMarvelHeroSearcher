import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {publicKey, privateKey} from './apikeys'

import * as md5 from 'md5'
import { BehaviorSubject, Observable } from 'rxjs';

import { Hero } from './models/Hero';
import { map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class MarvelApiService {

  private url:string = 'http://gateway.marvel.com/v1/public/'
  private ts = Date.now()

  behaviorSubject = new BehaviorSubject<Hero[]>([]);

  heroName: string = 'iron'
  offset : number = 0
  limit: number = 2
  characters :Hero[] = []

  constructor(private http: HttpClient) {  }

  getHash(){
    return md5(this.ts + privateKey + publicKey )
  }

  getCharacters(): void {
    this.http.get<Hero[]>(`${this.url}/characters`,{
      params: {
        "apikey": publicKey,
        "ts": String(this.ts),
        "hash": this.getHash(),
        "nameStartsWith": this.heroName,
        "offset" : String(this.offset),
        "limit" : String(this.limit),
      },
      observe: 'body' // use response for full details info. 
    })
    .pipe(
      //If only detailed description required
      //map((res: any) => res.data.results.filter((res : Hero) => res.description.length > 0)),
      map((res: any) => res.data.results),
      tap(console.log)
      ).subscribe(data => this.behaviorSubject.next(data))
  }

  getMoreCharacters(){
    this.offset += 2
    this.getCharacters()
  }

  getCharacterById(id:string): Observable<{}> {
    return this.http.get(`${this.url}/characters`,{
      params: {
        "apikey": publicKey,
        "ts": String(this.ts),
        "hash": this.getHash(),
        "id": id
      },
      observe: 'body' // use response for full details info. 
    })
  }

  newSearch(){
    this.offset = 0
  }
}
