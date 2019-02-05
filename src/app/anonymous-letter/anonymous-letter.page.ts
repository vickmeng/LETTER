import { Component, ViewChild, ElementRef } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { PaperCut } from 'src/entities/papercut';
import { BasePage } from 'src/shared/components/basePage';
import { UtilsService } from 'src/shared/utils/utils.service';
import { LoadingService } from 'src/shared/components/loading/loading.service';
@Component({
  selector: 'app-anonymous-letter',
  templateUrl: './anonymous-letter.page.html',
  styleUrls: ['./anonymous-letter.page.scss'],
})
export class AnonymousLetterPage extends BasePage {
  letter: PaperCut;
  value = '你好，你的儿子在我手里，请三天内将一百万现金放在天桥下，否则撕票。';
  @ViewChild('mainCanvas') mainCanvas: ElementRef<HTMLCanvasElement>;

  constructor(
    public menuController: MenuController,
    public utils: UtilsService,
    private loadingService: LoadingService
  ) {
    super(menuController);
   }

  ionViewDidEnter() {
    this.letter = new PaperCut(
      this.mainCanvas.nativeElement,
      this.loadingService.off
    );
    this.loadingService.on();
    this.letter.draw(this.value);
  }

  onWriteOver = () => {
    this.loadingService.on();
    this.letter.draw(this.value);
    return this.menuController.close('anonymousMenu');
  }

  onDownLoad = () => {
    this.loadingService.on();
    const download$ = this.utils.downloadCanvas(this.mainCanvas.nativeElement.toDataURL(), '匿名信');
    download$.subscribe(
      console.log,
      () => {},
      this.loadingService.off
    );
  }

}
