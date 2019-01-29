import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingFlowerComponent } from './loading-flower.component';

describe('LoadingFlowerComponent', () => {
  let component: LoadingFlowerComponent;
  let fixture: ComponentFixture<LoadingFlowerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingFlowerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingFlowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
