import { Component, EventEmitter, Inject, Input, OnInit, Output, ElementRef, ViewChild, SimpleChanges } from '@angular/core';
import { Film } from '../../film';
import { Actor } from '../../actor';
import { Router } from '@angular/router';
import { CONFIG_SERVICE } from '../../config-service';
import { FilmService } from '../film.service';
import { Config } from '../../config';

@Component({
  selector: 'app-film-item',
  templateUrl: './film-item.component.html',
  styleUrls: ['./film-item.component.css']
})
export class FilmItemComponent implements OnInit {
  @Input() film: Film;

  @Input() counter: number;


  constructor(@Inject(CONFIG_SERVICE) public configService: Config, public filmsService: FilmService,
    public router: Router) {
  }
  ngOnInit() { }
  oneFilm() {
    this.filmsService.oneFilmId = this.film.id;
    // this.filmsService.selectFilm = this.film;
    // this.filmsService.initOneFilm();
    // this.filmsService.initOneFilmCredits();
    console.log(this.film.id);
    // this.filmsService.getOneFilm(this.film.id)
    // setTimeout(() => { this.router.navigate(['/exp']); }, 1000);
    this.router.navigate(['/exp']);
  }

}
