import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackSuppressBtnComponent } from './track-suppress-btn.component';

describe('TrackSuppressBtnComponent', () => {
  let component: TrackSuppressBtnComponent;
  let fixture: ComponentFixture<TrackSuppressBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackSuppressBtnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackSuppressBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
