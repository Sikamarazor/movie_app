import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyticketsPage } from './mytickets';

@NgModule({
  declarations: [
    MyticketsPage,
  ],
  imports: [
    IonicPageModule.forChild(MyticketsPage),
  ],
  exports: [
    MyticketsPage
  ]
})
export class MyticketsPageModule {}
