import { NgModule, OnInit } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { FilmDetailsComponent } from './film-details.component';

const routes: Routes = [
  { path: '', component: FilmDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes),
    CommonModule],
  exports: [RouterModule]
})
export class FilmDetailsRoutingModule { }
