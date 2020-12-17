import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HardnessSelectorComponent } from './hardness-selector.component';

describe('HardnessSelectorComponent', () => {
  let component: HardnessSelectorComponent;
  let fixture: ComponentFixture<HardnessSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HardnessSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HardnessSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
