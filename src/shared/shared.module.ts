import { NgModule } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { UtilsService } from './utils/utils.service';
import { LoadingService } from './components/loading/loading.service';

import { LoadingComponent } from './components/loading/loading.component';
import { LoadingFlowerComponent } from './components/loading-flower/loading-flower.component';

@NgModule({
  declarations: [
    LoadingComponent,
    LoadingFlowerComponent,
  ],
  entryComponents: [
    LoadingComponent,
  ],
  imports: [
  ],
  providers: [
      UtilsService,
      LoadingService,
      Overlay,
  ]
})
export class SharedModule {}
