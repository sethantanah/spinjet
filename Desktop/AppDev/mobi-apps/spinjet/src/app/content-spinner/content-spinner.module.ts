import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContentSpinnerPageRoutingModule } from './content-spinner-routing.module';

import { ContentSpinnerPage } from './content-spinner.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContentSpinnerPageRoutingModule
  ],
  declarations: [ContentSpinnerPage]
})
export class ContentSpinnerPageModule {}
