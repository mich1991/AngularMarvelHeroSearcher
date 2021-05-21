import { Component, OnInit } from '@angular/core';
import { MarvelApiService } from '../marvel-api.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  alphabetArray:string[] = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']

  searchName!: string

  constructor(private http: MarvelApiService) { }

  ngOnInit(): void {

  }

  clickEvent(str:string): void{
    this.http.newSearch(str)
    
  }
  onClick(name: any){
    this.http.newSearch(name.value)
    name.value = ''
  }
  test(event: any){
    event.preventDefault()
    console.log(event)
  }
}
