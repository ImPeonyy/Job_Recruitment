import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageApplicationHistoryComponent } from './manage-application-history.component';

describe('ManageApplicationHistoryComponent', () => {
  let component: ManageApplicationHistoryComponent;
  let fixture: ComponentFixture<ManageApplicationHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageApplicationHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageApplicationHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
