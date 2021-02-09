import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {HexagonLoaderComponent} from './hexagon-loader.component';

describe('HexagonLoaderComponent', () => {
  let component: HexagonLoaderComponent;
  let fixture: ComponentFixture<HexagonLoaderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HexagonLoaderComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HexagonLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
