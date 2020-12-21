import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVersionDialogComponent } from './add-version-dialog.component';

describe('AddVersionDialogComponent', () => {
  let component: AddVersionDialogComponent;
  let fixture: ComponentFixture<AddVersionDialogComponent>;

  beforeEach(async(() => {
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
