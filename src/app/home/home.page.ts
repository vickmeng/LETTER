import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Nav {
  imgSrc: string;
  path: string;
  title: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  navList: Nav[] = [
    {
      imgSrc: '/assets/shapes.svg',
      path: 'anonymous-letter',
      title: '匿名信'
    },
    {
      imgSrc: '/assets/shapes.svg',
      path: 'chinese-color',
      title: '中国颜色'
    }
  ];
  constructor(
    private router: Router
  ) {}

  onRoute = (nav: Nav) => {
    this.router.navigate([nav.path]);
  }

}
