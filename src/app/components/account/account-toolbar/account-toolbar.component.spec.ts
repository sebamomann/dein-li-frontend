import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountToolbarComponent } from './account-toolbar.component';

describe('AccountToolbarComponent', () => {
  let component: AccountToolbarComponent;
  let fixture: ComponentFixture<AccountToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountToolbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
