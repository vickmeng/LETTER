import { Component } from '@angular/core';

import { NavController } from '@ionic/angular';
import { AnonymousLetterPage } from '../anonymous-letter/anonymous-letter.page';
import { Router } from '@angular/router';

interface Nav {
  imgSrc: string;
  path: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  anonymous: AnonymousLetterPage;


  navList: Nav[] = [
    {
      imgSrc: '/assets/shapes.svg',
      path: 'anonymous-letter',
    }
  ];
  constructor(
    private router: Router
  ) {}

  onRoute = (nav: Nav) => {
    this.router.navigate([nav.path]);
  }

}
