import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCompanyComponent } from './post-company.component';

describe('PostCompanyComponent', () => {
  let component: PostCompanyComponent;
  let fixture: ComponentFixture<PostCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostCompanyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
