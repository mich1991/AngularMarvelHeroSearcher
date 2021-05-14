import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { tap, map, filter  } from 'rxjs/operators';
import { MarvelApiService } from 'src/app/marvel-api.service';
import { Hero } from '../../models/Hero'


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit , OnDestroy{
 
  characters!: Hero[];

  private subscriptions = new Subscription() 

  constructor(private http: MarvelApiService) { }

  ngOnInit(): void {
    this.getCharacters('Iron')
    this.showDetails()
  }

  ngOnDestroy(): void{
    this.subscriptions.unsubscribe()
  }

  getCharacters(name:string = 'spider'): void {
    const sub = this.http.getCharacters(name).pipe(
      map((res: any) => res.data.results.filter((res : Hero) => res.description.length > 2)),
      tap(console.log),
      ).subscribe((data: Hero[]) => this.characters = data)
    this.subscriptions.add(sub)
  }

  showDetails() : void {
    setTimeout(() => console.log(this.subscriptions), 1000)
  }
}
