import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealersDetailsComponent } from './dealers-details.component';

describe('DealersDetailsComponent', () => {
  let component: DealersDetailsComponent;
  let fixture: ComponentFixture<DealersDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealersDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DealersDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
