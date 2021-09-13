import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EventsComponent} from './events.component';
import {EventsRoutingModule} from './events-routing.module';
import {SharedModule} from "../../shared/shared.module";
import { EventCardComponent } from './event-card/event-card.component';
import {ListComponent} from "./list/list.component";
import { FilterComponent } from './filter/filter.component';
import { EventDetailsComponent } from './event-details/event-details.component';


@NgModule({
  declarations: [
    EventsComponent,
    EventCardComponent,
    FilterComponent,
    ListComponent,
    EventDetailsComponent
  ],
  imports: [
    CommonModule,
    EventsRoutingModule,
    SharedModule
  ]
})
export class EventsModule {
}
