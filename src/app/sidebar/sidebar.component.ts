import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { MarvelApiService } from '../marvel-api.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  alphabetArray:string[] = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']

  searchName!: string

  constructor(private http: MarvelApiService, private data : DatabaseService) { }

  ngOnInit(): void {

  }

  clickEvent(str:string): void{
    console.log(str)
    this.data.characters = []
    this.http.newSearch(str)
    
  }
  onClick(name: any){
    this.data.characters = []
    this.http.newSearch(name.value)
    name.value = ''
  }
}
