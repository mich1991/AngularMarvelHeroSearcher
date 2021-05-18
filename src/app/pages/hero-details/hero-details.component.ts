import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {  Subscription } from 'rxjs';
import { MarvelApiService } from 'src/app/marvel-api.service';
import { tap } from 'rxjs/operators';
import { Location } from '@angular/common';


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
  isLoading:boolean = false

  constructor(private route: ActivatedRoute, private http: MarvelApiService, private location: Location) {
    this.paramId = this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    console.log(this.route.snapshot.paramMap.get('id'))
    this.getCharacterById();
  }
  ngOnDestroy(): void{
    this.subscription.unsubscribe()
  }

  getCharacterById(){
    this.isLoading = true
    let id = this.paramId
    const sub = this.http.getCharacterById(id).pipe(tap(console.log)).subscribe((res : any) => {
      this.isLoading = false
      return this.character = res.data.results[0]})
    this.subscription.add(sub)
  }
  showDetails() : void {
    console.log(this.character)
  }
  goBack(){
    this.location.back()
  }
}

