import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparedetailpanelComponent } from './comparedetailpanel.component';

describe('ComparedetailpanelComponent', () => {
  let component: ComparedetailpanelComponent;
  let fixture: ComponentFixture<ComparedetailpanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComparedetailpanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparedetailpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
