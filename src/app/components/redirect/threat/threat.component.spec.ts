import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ThreatComponent } from './threat.component';

describe('ThreatComponent', () => {
  let component: ThreatComponent;
  let fixture: ComponentFixture<ThreatComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
