import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UploadCvComponent } from './upload-cv.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EnrolmentService } from '../../services/enrolment/enrolment.service';
import { CloudsService } from '../../services/clouds/clouds.service';
import { of, throwError } from 'rxjs';

describe('UploadCvComponent', () => {
  let component: UploadCvComponent;
  let fixture: ComponentFixture<UploadCvComponent>;
  let enrolmentServiceMock: jasmine.SpyObj<EnrolmentService>;
  let cloudsServiceMock: jasmine.SpyObj<CloudsService>;
  let snackBarMock: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    // Tạo mock cho các dịch vụ
    enrolmentServiceMock = jasmine.createSpyObj('EnrolmentService', ['post']);
    cloudsServiceMock = jasmine.createSpyObj('CloudsService', ['jobIndex$', 'get']);
    snackBarMock = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [UploadCvComponent],
      providers: [
        { provide: EnrolmentService, useValue: enrolmentServiceMock },
        { provide: CloudsService, useValue: cloudsServiceMock },
        { provide: MatSnackBar, useValue: snackBarMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UploadCvComponent);
    component = fixture.componentInstance;
  });

  // Kiểm tra 1: Component khởi tạo đúng cách
  it('should create the component and initialize properties', () => {
    cloudsServiceMock.jobIndex$.next({ ID: 1 } as any); // Giả lập giá trị jobIndex$
    cloudsServiceMock.get.and.returnValue({ ID: 1 }); // Giả lập dữ liệu tài khoản người dùng
    fixture.detectChanges();

    expect(component).toBeTruthy();
    expect(component.jobIndex).toEqual({ ID: 1 });
    expect(component.user).toEqual({ ID: 1 });
    expect(component.enrolment).toEqual({
      ID: 0,
      job: null,
      account: null,
      cv: 'default',
      file: null,
      state: 0
    });
  });

  // Kiểm tra 2: Kiểm tra phương thức onFileSelected khi người dùng chọn file
  it('should set selectedFile when onFileSelected is called', () => {
    const file = new File([''], 'testCV.pdf');
    const event = { target: { files: [file] } } as any;
    component.onFileSelected(event);

    expect(component.selectedFile).toEqual(file);
  });

  // Kiểm tra 3: Kiểm tra phương thức apply khi upload thành công
  it('should call enrolmentService.post and handle success on apply()', () => {
    const formData = new FormData();
    formData.append('account', '1');
    formData.append('job', '1');
    formData.append('state', '0');
    formData.append('cv', 'default');
    formData.append('file', component.selectedFile);

    enrolmentServiceMock.post.and.returnValue(of({ success: true }));
    cloudsServiceMock.jobIndex$.next({ ID: 1 });
    cloudsServiceMock.get.and.returnValue({ ID: 1 });
    fixture.detectChanges();

    spyOn(component, 'openSnackBar');

    component.apply();

    expect(enrolmentServiceMock.post).toHaveBeenCalledWith(formData);
    expect(component.openSnackBar).not.toHaveBeenCalled();
  });

  // Kiểm tra 4: Kiểm tra phương thức apply khi upload bị lỗi
  it('should call openSnackBar and show error when apply() fails', () => {
    const formData = new FormData();
    formData.append('account', '1');
    formData.append('job', '1');
    formData.append('state', '0');
    formData.append('cv', 'default');
    formData.append('file', component.selectedFile);

    enrolmentServiceMock.post.and.returnValue(throwError(() => new Error('Upload failed')));
    cloudsServiceMock.jobIndex$.next({ ID: 1 });
    cloudsServiceMock.get.and.returnValue({ ID: 1 });
    fixture.detectChanges();

    component.apply();

    expect(enrolmentServiceMock.post).toHaveBeenCalledWith(formData);
    expect(snackBarMock.open).toHaveBeenCalledWith('Upload failed', 5);
  });
});
