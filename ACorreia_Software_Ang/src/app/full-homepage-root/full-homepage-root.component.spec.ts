import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullHomepageRootComponent } from './full-homepage-root.component';

describe('FullHomepageRootComponent', () => {
  let component: FullHomepageRootComponent;
  let fixture: ComponentFixture<FullHomepageRootComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FullHomepageRootComponent]
    });
    fixture = TestBed.createComponent(FullHomepageRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
