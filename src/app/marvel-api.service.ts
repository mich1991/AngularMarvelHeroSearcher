import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {publicKey, privateKey} from './apikeys'

import * as md5 from 'md5'
import { Observable } from 'rxjs';

import { Hero } from './models/Hero';
import { map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class MarvelApiService {

  private url:string = 'http://gateway.marvel.com/v1/public/'
  private ts = Date.now()

  heroName: string = 'iron'
  offset : number = 0
  limit: number = 20
  characters :Hero[] = []

  constructor(private http: HttpClient) { 
    this.getCharacters()
  }

  getHash(){
    return md5(this.ts + privateKey + publicKey )
  }

  
  getFromApi() : Observable<Hero[]>{
    return this.http.get<Hero[]>(`${this.url}/characters`,{
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
      )
  }
  
  getCharacters(): void{
    this.getFromApi().subscribe((data : Hero[]) => this.characters = data)
  }
  getMoreCharacters(){
    this.offset = this.offset + 20 
    this.getFromApi().subscribe((data : Hero[]) => this.characters.push(...data))
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

  newSearch(name : string){
    this.heroName = name
    this.offset = 0
    this.characters = []
    this.getFromApi().subscribe((data : Hero[]) => this.characters = data)
  }

}
