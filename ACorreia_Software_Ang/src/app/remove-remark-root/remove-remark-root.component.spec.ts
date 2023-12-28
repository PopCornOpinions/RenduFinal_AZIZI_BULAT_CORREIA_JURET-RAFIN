import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveRemarkRootComponent } from './remove-remark-root.component';

describe('RemoveRemarkRootComponent', () => {
  let component: RemoveRemarkRootComponent;
  let fixture: ComponentFixture<RemoveRemarkRootComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RemoveRemarkRootComponent]
    });
    fixture = TestBed.createComponent(RemoveRemarkRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
