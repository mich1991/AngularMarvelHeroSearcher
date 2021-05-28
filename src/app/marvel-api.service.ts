import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PUBLIC_KEY, PRIVATE_KEY} from './apikeys'

import * as md5 from 'md5'
import { Observable } from 'rxjs';

import { Hero } from './models/Hero';
import { map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class MarvelApiService {

  private url:string = 'https://gateway.marvel.com/v1/public/'
  private ts = Date.now()

  heroName: string = 'iron'
  offset : number = 0
  limit: number = 20
  characters :Hero[] = []
  moreAvailable: boolean = false
  isLoading : boolean = false

  constructor(private http: HttpClient) { 
    this.getCharacters()
  }

  getHash(){
    return md5(this.ts + PRIVATE_KEY + PUBLIC_KEY )
  }

  
  getFromApi() : Observable<Hero[]>{
    return this.http.get<Hero[]>(`${this.url}/characters`,{
      params: {
        "apikey": PUBLIC_KEY,
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
      // tap(console.log)
      )
  }
  
  getCharacters(): void{
    this.isLoading = true
    this.getFromApi().subscribe((data : Hero[]) => {    
      this.characters = data
      this.characters.length % this.limit === 0 ? this.moreAvailable = true : this.moreAvailable = false
      this.isLoading = false
    })
  }

  getMoreCharacters(): void {
    this.offset = this.offset + this.limit 
    this.getFromApi().subscribe((data : Hero[]) => {
      this.characters.push(...data)
      this.characters.length % this.limit === 0 ? this.moreAvailable = true : this.moreAvailable = false
      this.isLoading = false
    })
  }
  
  getCharacterById(id:string): Observable<{}> {
    return this.http.get(`${this.url}/characters`,{
      params: {
        "apikey": PUBLIC_KEY,
        "ts": String(this.ts),
        "hash": this.getHash(),
        "id": id
      },
      observe: 'body' // use response for full details info. 
    })
  }

  newSearch(name : string){
    if(name.length > 0){

      this.isLoading = true
      this.heroName = name
      this.offset = 0
      this.characters = []
      this.getFromApi().subscribe((data : Hero[]) => {
        this.characters = data
        this.characters.length % this.limit === 0 ? this.moreAvailable = true : this.moreAvailable = false
        this.isLoading = false
      })
      
    }

  }



}
