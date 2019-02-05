import {
  Component,
  ViewChild,
  ElementRef
} from '@angular/core';
import { MenuController } from '@ionic/angular';
import { BasePage } from 'src/shared/components/basePage';
import { UtilsService } from 'src/shared/utils/utils.service';
import { LoadingService } from 'src/shared/components/loading/loading.service';
import { ChineseColor } from 'src/entities/chineseColor';
@Component({
  selector: 'app-chinese-color',
  templateUrl: './chinese-color.page.html',
  styleUrls: ['./chinese-color.page.scss'],
})
export class ChineseColorPage extends BasePage {
  letter: ChineseColor;
  value = '';

  @ViewChild('paper') paper: ElementRef<HTMLElement>;


  constructor(
    public menuController: MenuController,
    public utils: UtilsService,
    private loadingService: LoadingService
  ) {
    super(menuController);
  }

  ionViewDidEnter() {
    this.letter = new ChineseColor(
      this.paper.nativeElement,
      () => {}
    );
  }

  onChange = () => {
    this.letter.change(this.value);
    this.onToggleNemu(false);
  }

  onDownLoad = () => {
    this.loadingService.on();
    const download$ = this.utils.downloadCanvas(this.paper.nativeElement.querySelector('canvas').toDataURL(), '中国颜色');
    download$.subscribe(
      () => {},
      () => {},
      this.loadingService.off
    );
  }
}
