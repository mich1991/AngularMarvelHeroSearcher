import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MarvelApiService } from 'src/app/marvel-api.service';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit , OnDestroy{

  isLoading : boolean = false
  moreAvailable: boolean = false

  constructor(public http: MarvelApiService, private route: ActivatedRoute) { 
  }


  ngOnInit(): void {
  }

  ngOnDestroy(): void{

  }

  getMore(): void {
    this.http.getMoreCharacters()

  }
  
  getCharacters(): void {
    this.http.getCharacters()
  }
}
