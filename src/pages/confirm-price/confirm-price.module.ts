import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConfirmPricePage } from './confirm-price';

@NgModule({
  declarations: [
    ConfirmPricePage,
  ],
  imports: [
    IonicPageModule.forChild(ConfirmPricePage),
  ],
  exports: [
    ConfirmPricePage
  ]
})
export class ConfirmPricePageModule {}
