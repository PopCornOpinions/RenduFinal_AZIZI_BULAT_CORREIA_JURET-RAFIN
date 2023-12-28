import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullHomepageComponent } from './full-homepage.component';

describe('FullHomepageComponent', () => {
  let component: FullHomepageComponent;
  let fixture: ComponentFixture<FullHomepageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FullHomepageComponent]
    });
    fixture = TestBed.createComponent(FullHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
