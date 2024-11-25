import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PutJobValueComponent } from './put-job-value.component';

describe('PutJobValueComponent', () => {
  let component: PutJobValueComponent;
  let fixture: ComponentFixture<PutJobValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PutJobValueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PutJobValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
