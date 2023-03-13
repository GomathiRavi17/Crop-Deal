import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CropsDetailsComponent } from './crops-details.component';

describe('CropsDetailsComponent', () => {
  let component: CropsDetailsComponent;
  let fixture: ComponentFixture<CropsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CropsDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CropsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
