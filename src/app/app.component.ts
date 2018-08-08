import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  links: object[] = [
    { path: '/main', label: 'Главная', active: 'button-active', icon: 'home' },
    { path: '/film', label: 'Все фильмы', active: 'button-active', icon: 'list_alt' },
    { path: '/actor', label: 'Все актеры', active: 'button-active', icon: 'list_alt' },

    // { path: '/search-router', label: 'Поиск фильмов', active: 'button-active', icon: 'list_alt' }
  ];

}