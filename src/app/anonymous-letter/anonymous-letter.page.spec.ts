import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnonymousLetterPage } from './anonymous-letter.page';

describe('AnonymousLetterPage', () => {
  let component: AnonymousLetterPage;
  let fixture: ComponentFixture<AnonymousLetterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnonymousLetterPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnonymousLetterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
