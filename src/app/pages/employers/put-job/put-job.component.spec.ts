import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PutJobComponent } from './put-job.component';

describe('PutJobComponent', () => {
  let component: PutJobComponent;
  let fixture: ComponentFixture<PutJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PutJobComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PutJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
