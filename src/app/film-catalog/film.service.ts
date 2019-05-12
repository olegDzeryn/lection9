import { Injectable, Inject } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Film } from '../film';
import { Actor } from '../actor';
import { Config } from '../config';
import { SortOption } from '../sort-option';
import { HttpClient } from '@angular/common/http';
import { CONFIG_SERVICE } from '../config-service';
import { catchError, map, pluck, retry, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FilmService {



  films: Film[] = [];
  actors: Actor[] = [];
  pageFilme: number;

  pageFilms = 1;
  pageActors: number = 1;

  pageSearchFilms: number = 1;
  searchedFilms: string;
  pageSearchActors: number = 1;
  searchedActors: string;
  searchedActorWord: string = '';
  searchedFilmsWord: string = '';
  oneFilmId: number;
  selectFilm: any = 10;

  constructor(private http: HttpClient,
    @Inject(CONFIG_SERVICE) public configService: Config) { }

  initPopularFilms() {
    if (this.pageFilms === 1) {
      this.films = [];
    }
    this.popularFilms(this.getPopularFilms(this.pageFilms));
  }
  initPopularActors() {
    if (this.pageActors === 1) {
      this.actors = [];
    }
    this.popularActor(this.getPopularActors(this.pageActors));
  }
  // initOneFilm() {
  //   this.oneFilm(this.getOneFilm, this.oneFilmId);
  // }
  // initOneFilmCredits() {
  //   this.oneFilmCredits(this.getOneFilmCredits, this.oneFilmId);
  // }

  popularFilms(item: any, searchedFilms?: string, pageSearchFilms?: number) {
    item.subscribe(
      (filmList: any) => {
        filmList.results.map((result) => {
          this.films.push({
            id: result.id,
            isFavorite: false,
            title: result.title,
            popularity: result.popularity,
            release_date: result.release_date,
            overview: result.overview.slice(0, 130),
            poster_path: `${this.configService.midImgPath}${result.poster_path}`,
            backdrop_path: `${this.configService.midImgPath}${result.backdrop_path}`
          });
        });
      });
  }
  popularFilmsSearch(item: any, searchedFilms?: string, pageSearchFilms?: number, ) {
    item(searchedFilms, pageSearchFilms).subscribe((filmList: any) => {
      filmList.results.map((result) => {
        this.films.push({
          id: result.id,
          isFavorite: false,
          title: result.title,
          popularity: result.popularity,
          release_date: result.release_date,
          overview: result.overview.slice(0, 130),
          poster_path: `${this.configService.midImgPath}${result.poster_path}`,
          backdrop_path: `${this.configService.midImgPath}${result.backdrop_path}`

        });
      });
    });
  }
  popularActor(item: any, searchedFilms?: string, pageSearchFilms?: number) {
    item.subscribe((actorList: any) => {
      actorList.results.map((result) => {
        this.actors.push({
          id: result.id,
          isFavorite: false,
          adult: false,
          name: result.name,
          popularity: result.popularity,
          profile_path: `${this.configService.midImgPath}${result.profile_path}`
        });
      });

    });
  }
  popularActorsSearch(item: any, searchedActors?: string, pageSearchActors?: number) {
    item(searchedActors, pageSearchActors).subscribe((actorList: any) => {
      actorList.results.map((result) => {
        this.actors.push({
          id: result.id,
          isFavorite: false,
          adult: false,
          name: result.name,
          popularity: result.popularity,
          profile_path: `${this.configService.midImgPath}${result.profile_path}`
        });
      });
    });
  }
  // oneFilm(item: any, oneFilmId?: number) {
  //   item(oneFilmId).subscribe((film: any) => {
  //     // console.log(film);
  //     film = film;
  //     // console.log(film);
  //   });
  // }
  // oneFilmCredits(item: any, oneFilmId?: number) {
  //   item(oneFilmId).subscribe((film: any) => {
  //     // console.log(film);
  //   });
  // }



  getActors() {
    return this.actors;
  }
  getFilms() {
    return this.films;
  }



  getPopularFilms = (page?: number) => {
    return this.http.get(`${this.configService.movieUrl}/popular?page=${page}${this.configService.params}`);
  }
  getPopularActors = (page?: number) => {
    return this.http.get(`${this.configService.personUrl}/popular?page=${page}${this.configService.params}`);
  }
  getSearchFilms = (searchedFilms?: string, page?: number) => {
    return this.http.get(`${this.configService.searchUrl}/movie?&query=${searchedFilms}${this.configService.params}&page=${page}&include_adult=false`)
  }
  getSearchActors = (searchedActors: string, page?: number) => {
    return this.http.get(`${this.configService.searchUrl}/person?&query=${searchedActors}${this.configService.params}&page=${page}&include_adult=false`)
  }

  // Частина коду повязана з search.component
  searchFilms() {
    if ((this.searchedFilms.length >= 3) && !(this.searchedFilms === this.searchedFilmsWord)) {
      this.films = [];
      this.popularFilmsSearch(this.getSearchFilms, this.searchedFilms, this.pageSearchFilms);

      this.searchedFilmsWord = this.searchedFilms;
    } else {
      if (this.searchedFilms.length >= 3) {
        this.popularFilmsSearch(this.getSearchFilms, this.searchedFilms, this.pageSearchFilms);
      } else {
        if (this.searchedFilms.length === 0) {
        }
      }
    }
  }
  searchActors() {
    if ((this.searchedActors.length >= 3) && !(this.searchedActors === this.searchedActorWord)) {
      this.actors = [];
      this.popularActorsSearch(this.getSearchActors, this.searchedActors, this.pageSearchActors);

      this.searchedActorWord = this.searchedActors;
    } else {
      if (this.searchedActors.length >= 3) {
        this.popularActorsSearch(this.getSearchActors, this.searchedActors, this.pageSearchActors);
      } else {
        if (this.searchedActors.length === 0) {
        }
      }
    }
    console.log(this.actors);
  }
  getOneFilm = (oneFilmId: number) => {
    return this.http.get(`${this.configService.movieUrl}/${oneFilmId}?${this.configService.params}`)
      .pipe(
        retry(2),
        map(this.toSelectFilm)
      );
    // return this.http.get(`${this.configService.movieUrl}/popular?page=${page}${this.configService.params}`);
  }
  getOneFilmCredits = (oneFilmId: number) => {
    return this.http.get(`${this.configService.movieUrl}/${oneFilmId}/credits?api_key=${this.configService.apiKey}`).
      pipe(
        retry(2),
        map(this.toSelectFilmCredits)
      );
    // https://api.themoviedb.org/3/movie/498580/credits?api_key=0994e7679a856150aadcecf7de489bce
  }
  private toSelectFilm(film: any): any {
    return {
      id: film.id,
      isFavorite: false,
      overview: film.overview,
      popularity: film.popularity,
      // poster_path: `${this.configService.midImgPath}${film.poster_path}`,
      poster_path: `https://image.tmdb.org/t/p/w300${film.poster_path}`,
      release_date: film.release_date,
      title: film.title,
      backdrop_path: `${film.backdrop_path}`
    };
  }
  private toSelectFilmCredits(film: any): any {
    return {

      // poster_path: `${this.configService.midImgPath}${film.poster_path}`,
      poster_path: `https://image.tmdb.org/t/p/w300${film.poster_path}`,
      director: film.crew[3].name,
      screenplay: film.crew[4].name,
      photograph: film.crew[11].name,
      // actor_name_1: film.cast[0].name,
      // actor_character_1: film.cast[0].character,
      // actor_profile_path_1: `https://image.tmdb.org/t/p/w300${film.cast[1].profile_path}`,
      // actor_name_2: film.cast[1].name,
      // actor_character_2: film.cast[1].character,
      // actor_profile_path_2: `https://image.tmdb.org/t/p/w300${film.cast[1].profile_path}`,
      // actor_name_3: film.cast[2].name,
      // actor_character_3: film.cast[2].character,
      // actor_profile_path_3: `https://image.tmdb.org/t/p/w300${film.cast[2].profile_path}`,
      // actor_name_4: film.cast[3].name,
      // actor_character_4: film.cast[3].character,
      // actor_profile_path_4: `https://image.tmdb.org/t/p/w300${film.cast[3].profile_path}`,
      filmCastActors: [
        {
          actor_name: film.cast[0].name,
          actor_character: film.cast[0].character,
          actor_profile_path: `https://image.tmdb.org/t/p/w300${film.cast[0].profile_path}`
        },
        {
          actor_name: film.cast[1].name,
          actor_character: film.cast[1].character,
          actor_profile_path: `https://image.tmdb.org/t/p/w300${film.cast[1].profile_path}`
        },
        {
          actor_name: film.cast[2].name,
          actor_character: film.cast[2].character,
          actor_profile_path: `https://image.tmdb.org/t/p/w300${film.cast[2].profile_path}`
        },
        {
          actor_name: film.cast[3].name,
          actor_character: film.cast[3].character,
          actor_profile_path: `https://image.tmdb.org/t/p/w300${film.cast[3].profile_path}`
        },
        {
          actor_name: film.cast[4].name,
          actor_character: film.cast[4].character,
          actor_profile_path: `https://image.tmdb.org/t/p/w300${film.cast[4].profile_path}`
        }
      ]
    };
  }
}
// https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US
// params: `&api_key=0994e7679a856150aadcecf7de489bce&language=ru-RU`,