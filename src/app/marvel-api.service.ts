import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {publicKey, privateKey} from './apikeys'

import * as md5 from 'md5'
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MarvelApiService {

  private url:string = 'http://gateway.marvel.com/v1/public/'
  private ts = Date.now()


  constructor(private http: HttpClient) {
    // let data = this.getCharacters().pipe(tap(console.log)).subscribe()
    // console.log(data)
  }

  getHash(){
    return md5(this.ts + privateKey + publicKey )
  }

  getCharacters(): Observable<{}> {
    return this.http.get(`${this.url}/characters`,{
      params: {
        "apikey": publicKey,
        "ts": String(this.ts),
        "hash": this.getHash(),
        "nameStartsWith": "spider"
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
