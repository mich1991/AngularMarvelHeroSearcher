import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import {switchMap} from 'rxjs/operators'
import { MarvelApiService } from 'src/app/marvel-api.service';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'app-hero-details',
  templateUrl: './hero-details.component.html',
  styleUrls: ['./hero-details.component.scss']
})
export class HeroDetailsComponent implements OnInit {

  public paramId:string;
  public id;
  
  // characterDetails= Observable<{}>;

  constructor(private route: ActivatedRoute, private http: MarvelApiService) {
    this.id = '1'
    this.paramId = '1'
  }

  ngOnInit(): void {
    this.paramId = this.route.snapshot.paramMap.get('id')!;
    // console.log('paramId', this.paramId)
    console.log(this.route.snapshot.paramMap.get('id'))
  }
  getCharacter(){
    this.http.getCharacters().pipe(tap(console.log)).subscribe()
  }
  getCharacterById(){
    let id = this.paramId
    this.http.getCharacterById(id).pipe(tap(console.log)).subscribe()
  }
}

