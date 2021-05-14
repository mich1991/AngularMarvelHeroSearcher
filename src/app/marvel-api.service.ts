import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {publicKey, privateKey} from './apikeys'

import * as md5 from 'md5'
import { BehaviorSubject, Observable } from 'rxjs';

import { Hero } from './models/Hero';


@Injectable({
  providedIn: 'root'
})

export class MarvelApiService {

  private url:string = 'http://gateway.marvel.com/v1/public/'
  private ts = Date.now()

  behaviorSubject = new BehaviorSubject<Hero[]>([]);

  constructor(private http: HttpClient) {  }

  getHash(){
    return md5(this.ts + privateKey + publicKey )
  }

  getCharacters(name:string = 'spider'): Observable<{}> {
    return this.http.get(`${this.url}/characters`,{
      params: {
        "apikey": publicKey,
        "ts": String(this.ts),
        "hash": this.getHash(),
        "nameStartsWith": name
      },
      observe: 'body' // use response for full details info. 
    })
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
  getCharacterByName(name:string): Observable<{}> {
    return this.http.get(`${this.url}/characters`,{
      params: {
        "apikey": publicKey,
        "ts": String(this.ts),
        "hash": this.getHash(),
        "nameStartsWith": name
      },
      observe: 'body' // use response for full details info. 
    })
  }

}
