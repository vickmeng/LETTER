import { Component, OnInit , Input } from '@angular/core';

@Component({
  selector: 'app-transparent-header',
  templateUrl: './transparent-header.component.html',
  styleUrls: ['./transparent-header.component.scss']
})
export class TransparentHeaderComponent implements OnInit {
  @Input() color: 'light' | 'dark' = 'dark';

  constructor() { }
  ngOnInit() {
  }

}
