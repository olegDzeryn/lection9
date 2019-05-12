import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { RouterModule } from '@angular/router';
import { FilmDetailsComponent } from './film-details.component';
import { FilmDetailsRoutingModule } from './film-details-routing.module';
// tslint:disable-next-line: max-line-length
// import { MatToolbarModule, MatIconModule, MatCardModule, MatTabsModule, MatProgressSpinnerModule, MatButtonModule } from '@angular/material';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatTabsModule, MatGridListModule } from '@angular/material';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  imports: [
    CommonModule,
    FilmDetailsRoutingModule,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    FormsModule,
    // MatCardTitle,
    // BrowserAnimationsModule,
    MatGridListModule

  ],
  declarations: [FilmDetailsComponent]
})
export class FilmDetailsModule { }
