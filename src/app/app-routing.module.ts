import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './views/about/about.component';
import { BestdealsComponent } from './views/bestdeals/bestdeals.component';
import { HomeComponent } from './views/home/home.component';
import { ListComponent } from './views/list/list.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'list',
    component: ListComponent
  },
  {
    path: 'make-a-choice',
    component: BestdealsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
