import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../models/Hero';

@Component({
  selector: 'app-single-card',
  templateUrl: './single-card.component.html',
  styleUrls: ['./single-card.component.scss']
})
export class SingleCardComponent implements OnInit {

  @Input()

  hero! : Hero
  constructor() { }

  ngOnInit(): void {
  }

}
