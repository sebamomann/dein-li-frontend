import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicCallChartComponent } from './basic-call-chart.component';

describe('BasicCallChartComponent', () => {
  let component: BasicCallChartComponent;
  let fixture: ComponentFixture<BasicCallChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicCallChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicCallChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
