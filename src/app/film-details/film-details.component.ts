
import { Component, EventEmitter, Inject, Input, OnInit, Output, ElementRef, ViewChild, SimpleChanges } from '@angular/core';
import { Film } from '../film';
import { Actor } from '../actor';
import { Router } from '@angular/router';
import { CONFIG_SERVICE } from '../config-service';
import { FilmService } from '../film-catalog/film.service';
import { Config } from '../config';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-film-details',
  templateUrl: './film-details.component.html',
  styleUrls: ['./film-details.component.css']
})
export class FilmDetailsComponent implements OnInit {
  bool: any = true;
  filmCredits: any;
  urlBack(): any {
    // return 'url(https://image.tmdb.org/t/p/w1400_and_h450_face/bOGkgRGdhrBYJSLpXaxhXVstddV.jpg)';
    return `url(https://image.tmdb.org/t/p/w1400_and_h450_face/${this.film.backdrop_path})`;
  }

  film: Film;
  filmCastActors: any = [];
  styleConfig: any = { 'background_image': this.bool ? 'url(https://image.tmdb.org/t/p/w1400_and_h450_face/bOGkgRGdhrBYJSLpXaxhXVstddV.jpg)' : 'url(https://image.tmdb.org/t/p/w1400_and_h450_face/bOGkgRGdhrBYJSLpXaxhXVstddV.jpg)' }
  styleConfigDiv(): any {
    return {
      'background-image': this.bool ? 'url(https://image.tmdb.org/t/p/w1400_and_h450_face/bOGkgRGdhrBYJSLpXaxhXVstddV.jpg)' : this.urlBack()
    };
  }



  styleConfigBackground() {
    return 'url(https://image.tmdb.org/t/p/w1400_and_h450_face/bOGkgRGdhrBYJSLpXaxhXVstddV.jpg)';
  }



  constructor(@Inject(CONFIG_SERVICE) public configService: Config, public filmsService: FilmService,
    public router: Router) {
  }
  background(): string {
    return 'background-image:url(https://image.tmdb.org/t/p/w300$/lz1iJlKRBMtE6uHauUneX7THa0c.jpg)';
  }



  ngOnInit() {

    // console.log(this.filmsService.oneFilmId);

    this.filmsService.getOneFilm(this.filmsService.oneFilmId).subscribe((item) => {
      this.film = item;
      this.bool = false;
      console.log(this.bool);
      // console.log(this.styleConfigDivFn());
    });
    this.filmsService.getOneFilmCredits(this.filmsService.oneFilmId).subscribe((item) => {
      this.filmCredits = item;
      this.filmCastActors = this.filmCredits.filmCastActors;
      // console.log(item);
      console.log(this.filmCastActors);
    });

  }

}
