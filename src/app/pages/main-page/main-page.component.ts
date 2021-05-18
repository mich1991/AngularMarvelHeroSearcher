import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { MarvelApiService } from 'src/app/marvel-api.service';
import { Hero } from '../../models/Hero'


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit , OnDestroy{
 
  characters!: Hero[];
  isLoading : boolean = false
  private subscriptions = new Subscription() 
  

  constructor(private http: MarvelApiService, private route: ActivatedRoute) { 
  }


  ngOnInit(): void {
    this.getCharacters()
  }

  ngOnDestroy(): void{
    this.subscriptions.unsubscribe()
  }

  getCharacters(): void {
    this.isLoading = true
    this.http.getCharacters()
    const sub = this.http.behaviorSubject.subscribe((data: Hero[]) => {
      this.isLoading = false
      return this.characters = data})
    this.subscriptions.add(sub)
  }

  showDetails() : void {
    setTimeout(() => console.log(this.subscriptions), 1000)
  }
}
