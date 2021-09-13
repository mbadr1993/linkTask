import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EventsModule} from "./fetcher/events/events.module";

const routes: Routes = [
  {
    path: 'list',
    loadChildren: () =>
      import('./fetcher/events/events.module').then(
        (m) => m.EventsModule
      )
  },{
    path: '**',
    loadChildren: () =>
      import('./fetcher/events/events.module').then(
        (m) => m.EventsModule
      )
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
