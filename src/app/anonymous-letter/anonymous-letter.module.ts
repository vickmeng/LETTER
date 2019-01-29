import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AnonymousLetterPage } from './anonymous-letter.page';

const routes: Routes = [
  {
    path: '',
    component: AnonymousLetterPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AnonymousLetterPage],
})
export class AnonymousLetterPageModule {}
