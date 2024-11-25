import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostJobValueComponent } from './post-job-value.component';

describe('PostJobValueComponent', () => {
  let component: PostJobValueComponent;
  let fixture: ComponentFixture<PostJobValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostJobValueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostJobValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
