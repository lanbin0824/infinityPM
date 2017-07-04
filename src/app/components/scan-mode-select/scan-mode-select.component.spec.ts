import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanModeSelectComponent } from './scan-mode-select.component';

describe('ScanModeSelectComponent', () => {
  let component: ScanModeSelectComponent;
  let fixture: ComponentFixture<ScanModeSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScanModeSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScanModeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
