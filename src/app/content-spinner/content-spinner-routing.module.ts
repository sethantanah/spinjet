import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContentSpinnerPage } from './content-spinner.page';

const routes: Routes = [
  {
    path: '',
    component: ContentSpinnerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentSpinnerPageRoutingModule {}
