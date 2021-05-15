import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import {map, switchMap} from 'rxjs/operators'
import { MarvelApiService } from 'src/app/marvel-api.service';
import { tap } from 'rxjs/operators';
import { Hero } from 'src/app/models/Hero';


@Component({
  selector: 'app-hero-details',
  templateUrl: './hero-details.component.html',
  styleUrls: ['./hero-details.component.scss']
})
export class HeroDetailsComponent implements OnInit, OnDestroy {

  @Input()
  public paramId:string;
  private subscription = new Subscription();
  character: any 

  constructor(private route: ActivatedRoute, private http: MarvelApiService) {
    this.paramId = this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    console.log(this.route.snapshot.paramMap.get('id'))
    this.getCharacterById();
  }
  ngOnDestroy(): void{
    this.subscription.unsubscribe()
  }

  // getCharacter(){
  //   this.http.getCharacters().pipe(tap(console.log)).subscribe()
  // }
  getCharacterById(){
    let id = this.paramId
    const sub = this.http.getCharacterById(id).pipe(tap(console.log)).subscribe((res : any) => this.character = res.data.results[0])
    this.subscription.add(sub)
  }
  showDetails() : void {
    console.log(this.character)
  }
}

