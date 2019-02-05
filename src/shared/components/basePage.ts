import { ViewChild } from '@angular/core';
import { IonMenu, MenuController } from '@ionic/angular';

export class BasePage {
    menuId = '';

    @ViewChild(IonMenu)
    set IonMenu(v: IonMenu) {
      setTimeout(() => {
          this.menuId = v.menuId;
       }, 0);
    }
    constructor(
        public menuController: MenuController,

    ) {}

  onToggleNemu = (judge: boolean) => judge ? this.menuController.open(this.menuId) : this.menuController.close(this.menuId);
}
