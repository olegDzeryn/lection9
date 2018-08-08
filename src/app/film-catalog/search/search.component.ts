import {
    Component, EventEmitter, Input, OnInit, Output, ElementRef, ViewChild, SimpleChanges,
    ViewEncapsulation, Inject, ViewChildren, QueryList
} from '@angular/core';
import { Film } from '../../film';
import { Actor } from '../../actor';
import { FilmService } from '../film.service';
import { CONFIG_SERVICE } from '../../config-service';
import { Config } from '../../config';
import { Router } from '@angular/router';

@Component({
    selector: 'app-search-films',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {

    filmsDataSearch: Film[];
    actorsDataSearch: Actor[];
    pageSearchFilms: number = 0;
    pageSearchActors: number = 0;
    searchedFilms: string;
    searchedActors: string;
    variantDisplay: boolean = true;
    @Output('searchF') searchFilmsEmitter = new EventEmitter<Film[]>();
    searchFilmsEmiter() {
        this.searchFilmsEmitter.emit();
    }
    @Output('searchA') searchActorsEmitter = new EventEmitter<Actor[]>();
    searchActorsEmiter(actorsDataSearch: Actor[]) {
        this.searchActorsEmitter.emit(actorsDataSearch);
    }
    constructor(@Inject(CONFIG_SERVICE) public configService: Config, public filmsService: FilmService, public router: Router) {
    }

    ngOnInit() { }
    searchFilms() {
        this.filmsService.searchedFilms = this.searchedFilms;
        this.pageSearchFilms = this.pageSearchFilms + 1;
        this.filmsService.pageSearchFilms = this.pageSearchFilms;
        this.filmsService.searchFilms();
    }
    searchActors() {
        this.filmsService.searchedActors = this.searchedActors;
        this.pageSearchActors = this.pageSearchActors + 1;
        this.filmsService.pageSearchActors = this.pageSearchActors;
        this.filmsService.searchActors();
    }


    searchFilmsActors() {
        if (this.router.url === "/film") {
            this.searchFilms();
        } else {
            if (this.router.url === "/actor") {
                this.searchActors();
            }
        }
    }


}



