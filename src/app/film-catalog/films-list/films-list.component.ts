import { Component, OnInit, ViewEncapsulation, ViewChild, Inject, ElementRef, ViewChildren, QueryList, SimpleChanges } from '@angular/core';
//import { InjectionToken } from '@angular/core';
import { CONFIG_SERVICE } from '../../config-service';
import { Config } from '../../config';
import { Router } from '@angular/router';
import { FilmService } from '../film.service';
import { Film } from '../../film';
import { SortOption } from '../../sort-option';
import { FilmItemComponent } from '../film-item/film-item.component';

import { SearchComponent } from '../search/search.component';

import { Actor } from '../../actor';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: '.films',
  templateUrl: './films-list.component.html',
  styleUrls: ['./films-list.component.css']
})
export class FilmsListComponent implements OnInit {
  filmsData: Film[];
  actorsData: Actor[];

  variantDisplay: boolean = true;

  pageFilms: number = 1;

  @ViewChild(SearchComponent) search: SearchComponent;
  constructor(@Inject(CONFIG_SERVICE) public configService: Config, public filmsService: FilmService,
    public router: Router) {
  }

  ngOnInit() {
    this.filmsService.initPopularFilms();
    this.filmsData = this.filmsService.getFilms();
  }
  makeSearchFilms(filmsDataSearch?: Film[]) {
    if (this.router.url === "/film") {
      this.variantDisplay = false;
      this.filmsData = this.filmsService.getFilms()
    }
  }
  setPagingFilms() {
    this.pageFilms++;
    this.filmsService.initPopularFilms();
  }
  setPagingSearchFilms() {
    this.search.searchFilms();
  }
}
