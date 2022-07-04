import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KoFiBtnComponent } from './ko-fi-btn.component';

describe('KoFiBtnComponent', () => {
  let component: KoFiBtnComponent;
  let fixture: ComponentFixture<KoFiBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KoFiBtnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KoFiBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
