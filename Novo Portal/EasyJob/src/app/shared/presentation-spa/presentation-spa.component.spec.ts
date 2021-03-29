import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentationSpaComponent } from './presentation-spa.component';

describe('PresentationSpaComponent', () => {
  let component: PresentationSpaComponent;
  let fixture: ComponentFixture<PresentationSpaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresentationSpaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentationSpaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
