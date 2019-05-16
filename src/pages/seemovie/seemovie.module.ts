import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SeemoviePage } from './seemovie';

@NgModule({
  declarations: [
    SeemoviePage,
  ],
  imports: [
    IonicPageModule.forChild(SeemoviePage),
  ],
  exports: [
    SeemoviePage
  ]
})
export class SeemoviePageModule {}
