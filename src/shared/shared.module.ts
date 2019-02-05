import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Overlay } from '@angular/cdk/overlay';
import { UtilsService } from './utils/utils.service';
import { LoadingService } from './components/loading/loading.service';

import { LoadingComponent } from './components/loading/loading.component';
import { LoadingFlowerComponent } from './components/loading-flower/loading-flower.component';
import { TransparentHeaderComponent } from './components/transparent-header/transparent-header.component';

@NgModule({
  declarations: [
    LoadingComponent,
    LoadingFlowerComponent,
    TransparentHeaderComponent,
  ],
  entryComponents: [
    LoadingComponent,
  ],
  imports: [
    IonicModule,
    CommonModule,
  ],
  providers: [
      UtilsService,
      LoadingService,
      Overlay,
  ],
  exports: [
    TransparentHeaderComponent,
  ]
})
export class SharedModule {}
