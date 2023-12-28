import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveRemarkUserComponent } from './remove-remark-user.component';

describe('RemoveRemarkUserComponent', () => {
  let component: RemoveRemarkUserComponent;
  let fixture: ComponentFixture<RemoveRemarkUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RemoveRemarkUserComponent]
    });
    fixture = TestBed.createComponent(RemoveRemarkUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
