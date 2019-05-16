import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UpcomingmoviesPage } from './upcomingmovies';

@NgModule({
  declarations: [
    UpcomingmoviesPage,
  ],
  imports: [
    IonicPageModule.forChild(UpcomingmoviesPage),
  ],
  exports: [
    UpcomingmoviesPage
  ]
})
export class UpcomingmoviesPageModule {}
