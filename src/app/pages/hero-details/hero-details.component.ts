import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import {switchMap} from 'rxjs/operators'

@Component({
  selector: 'app-hero-details',
  templateUrl: './hero-details.component.html',
  styleUrls: ['./hero-details.component.scss']
})
export class HeroDetailsComponent implements OnInit {

  // characterDetails= Observable<{}>;
  characterDetails= {id:2}
  // constructor(private http: HttpService, private route: ActivatedRoute) { }
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // this.route.paramMap.pipe(
    //     switchMap((params:ParamMap) => this.http.getCharacter(params.get('id')))
    // )

    this.route.queryParams.subscribe((params) => {
      // this.characterDetails.id = params.get('id')
      console.log(params['id'])
    })
  }

}
