import { Injectable, Inject } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Film } from '../film';
import { Actor } from '../actor';
import { Config } from '../config'
import { SortOption } from '../sort-option';
import { HttpClient } from '@angular/common/http';
import { CONFIG_SERVICE } from '../config-service';


@Injectable({
  providedIn: 'root'
})
export class FilmService {



  films: Film[] = [];
  actors: Actor[] = [];

  pageFilms: number = 1;
  pageActors: number = 1;

  pageSearchFilms: number = 1;
  searchedFilms: string;
  pageSearchActors: number = 1;
  searchedActors: string;
  searchedActorWord: string = '';
  searchedFilmsWord: string = '';


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
            poster_path: `${this.configService.midImgPath}${result.poster_path}`
          })
        })
      })
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
          poster_path: `${this.configService.midImgPath}${result.poster_path}`

        })
      })
    })
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
        })
      })

    }
    )
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
        })
      })
    })
  }

  constructor(private http: HttpClient,
    @Inject(CONFIG_SERVICE) public configService: Config) { }

  getActors() {
    return this.actors;
  }
  getFilms() {
    return this.films;
  }



  getPopularFilms = (page?: number) => {
    return this.http.get(`${this.configService.movieUrl}/popular?page=${page}${this.configService.params}`)
  };
  getPopularActors = (page?: number) => {
    return this.http.get(`${this.configService.personUrl}/popular?page=${page}${this.configService.params}`)
  }
  getSearchFilms = (searchedFilms?: string, page?: number) => {
    return this.http.get(`${this.configService.searchUrl}/movie?&query=${searchedFilms}${this.configService.params}&page=${page}&include_adult=false`)
  }
  getSearchActors = (searchedActors: string, page?: number) => {
    return this.http.get(`${this.configService.searchUrl}/person?&query=${searchedActors}${this.configService.params}&page=${page}&include_adult=false`)
  }

  //Частина коду повязана з search.component
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
}
