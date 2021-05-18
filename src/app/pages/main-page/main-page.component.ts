import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DatabaseService } from 'src/app/database.service';
import { MarvelApiService } from 'src/app/marvel-api.service';
import { Hero } from '../../models/Hero'


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit , OnDestroy{
 
  characters: Hero[]= [];
  isLoading : boolean = false
  private subscriptions = new Subscription() 

  constructor(private http: MarvelApiService, private route: ActivatedRoute, private data: DatabaseService) { 
  }


  ngOnInit(): void {
    this.getCharacters()
    this.characters = this.data.characters

  }

  ngOnDestroy(): void{
    this.subscriptions.unsubscribe()
  }

  getCharacters(): void {
    this.http.getCharacters()
    const sub = this.http.behaviorSubject.subscribe((data: Hero[]) => {
      this.data.characters.push(...data)
      this.characters = this.data.characters
    })
    this.subscriptions.add(sub)

  }
  

  showDetails() : void {
    setTimeout(() => console.log(this.subscriptions), 1000)
  }
  getMore(): void {
    this.http.getMoreCharacters()
    console.log(this.data.characters)
    this.characters = this.data.characters
  }
}
