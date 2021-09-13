import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListComponent} from "./list/list.component";
import {EventDetailsComponent} from './event-details/event-details.component';


const routes: Routes = [
  {
    path: '',
    component: ListComponent
  }, {
    path: 'eventDetails/:eventId',
    component: EventDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule {
}
