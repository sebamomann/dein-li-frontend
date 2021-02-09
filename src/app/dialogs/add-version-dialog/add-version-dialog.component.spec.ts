import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddVersionDialogComponent } from './add-version-dialog.component';

describe('AddVersionDialogComponent', () => {
  let component: AddVersionDialogComponent;
  let fixture: ComponentFixture<AddVersionDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddVersionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVersionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
