import { Component, EventEmitter, Input, OnInit, Inject, Output, ElementRef, ViewChild, SimpleChanges } from '@angular/core';
import { Film } from '../../film';
import { Actor } from '../../actor';


@Component({
    selector: 'app-actor-item',
    templateUrl: './actor-item.component.html',
    styleUrls: ['./actor-item.component.css']
})
export class ActorItemComponent implements OnInit {
    @Input() actor: Actor;
    @Input() counter: number;
    @Output('star') starEmitter = new EventEmitter<Actor>();

    constructor() {
    }
    ngOnInit() { }
    startFilm(actor: Actor) {
        this.starEmitter.emit(actor);
    }


}
