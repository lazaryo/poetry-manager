import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PoemsPage } from './poems';

@NgModule({
  declarations: [
    PoemsPage,
  ],
  imports: [
    IonicPageModule.forChild(PoemsPage),
  ],
})
export class PoemsPageModule {}
