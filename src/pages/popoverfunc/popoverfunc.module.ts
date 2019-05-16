import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PopoverfuncPage } from './popoverfunc';

@NgModule({
  declarations: [
    PopoverfuncPage,
  ],
  imports: [
    IonicPageModule.forChild(PopoverfuncPage),
  ],
  exports: [
    PopoverfuncPage
  ]
})
export class PopoverfuncPageModule {}
