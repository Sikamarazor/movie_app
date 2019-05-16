import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewmoviesPage } from './viewmovies';

@NgModule({
  declarations: [
    ViewmoviesPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewmoviesPage),
  ],
  exports: [
    ViewmoviesPage
  ]
})
export class ViewmoviesPageModule {}
