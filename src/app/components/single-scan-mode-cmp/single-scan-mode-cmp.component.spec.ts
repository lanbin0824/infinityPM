import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleScanModeCmpComponent } from './single-scan-mode-cmp.component';

describe('SingleScanModeCmpComponent', () => {
  let component: SingleScanModeCmpComponent;
  let fixture: ComponentFixture<SingleScanModeCmpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleScanModeCmpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleScanModeCmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
