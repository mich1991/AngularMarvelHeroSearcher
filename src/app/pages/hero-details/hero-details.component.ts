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

  // characterDetails= Observable<{}>;
  characterDetails= {id:2}
  public id: string | null
  constructor(private route: ActivatedRoute, private http: MarvelApiService) {
    this.id = '1'
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
 
  }
  getCharacter(){
    // this.http.getCharacters()
    console.log('clicked')
    this.http.getCharacters().pipe(tap(console.log)).subscribe()
  }
}

