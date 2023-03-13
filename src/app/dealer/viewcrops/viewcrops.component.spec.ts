import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewcropsComponent } from './viewcrops.component';

describe('ViewcropsComponent', () => {
  let component: ViewcropsComponent;
  let fixture: ComponentFixture<ViewcropsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewcropsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewcropsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
