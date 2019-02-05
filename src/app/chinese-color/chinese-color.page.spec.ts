import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChineseColorPage } from './chinese-color.page';

describe('ChineseColorPage', () => {
  let component: ChineseColorPage;
  let fixture: ComponentFixture<ChineseColorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChineseColorPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChineseColorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
