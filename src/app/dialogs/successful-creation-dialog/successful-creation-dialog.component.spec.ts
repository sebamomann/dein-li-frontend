import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SuccessfulCreationDialogComponent } from './successful-creation-dialog.component';

describe('SuccessfulCreationDialogComponent', () => {
  let component: SuccessfulCreationDialogComponent;
  let fixture: ComponentFixture<SuccessfulCreationDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccessfulCreationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessfulCreationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
