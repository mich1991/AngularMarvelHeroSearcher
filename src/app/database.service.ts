import { Injectable } from '@angular/core';
import { Hero } from './models/Hero';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  characters : Hero[] = []
  constructor() { }
  
}
