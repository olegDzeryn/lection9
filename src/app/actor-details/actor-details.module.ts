import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActorDetailsRoutingModule } from './actor-details-routing.module';
import { ActorDetailsComponent } from './actor-details.component';

@NgModule({
  imports: [
    CommonModule,
    ActorDetailsRoutingModule
  ],
  declarations: [ActorDetailsComponent]
})
export class ActorDetailsModule { }
