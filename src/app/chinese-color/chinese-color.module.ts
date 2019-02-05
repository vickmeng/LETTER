import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/shared/shared.module';

import { ChineseColorPage } from './chinese-color.page';

const routes: Routes = [
  {
    path: '',
    component: ChineseColorPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ChineseColorPage],
})
export class ChineseColorPageModule {}
