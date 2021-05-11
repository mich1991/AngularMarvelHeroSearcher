import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainPageComponent} from './pages/main-page/main-page.component'
import {HeroDetailsComponent} from './pages/hero-details/hero-details.component'


const routes: Routes = [
  {path:'', component: MainPageComponent},
  {path:'character/:id', component: HeroDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
