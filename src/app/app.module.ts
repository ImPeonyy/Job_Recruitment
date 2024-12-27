import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule} from '@angular/material/sidenav'
import { MatListModule} from '@angular/material/list'
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSort, MatSortModule } from '@angular/material/sort';
import {MatRadioModule} from '@angular/material/radio';

import { AppComponent } from './app.component';
import { IndexComponent } from './pages/index/index.component';
import { PostJobComponent } from './pages/employer/post-job/post-job.component';
import { PutJobComponent } from './pages/employer/put-job/put-job.component';
import { ManageJobPostingsComponent } from './pages/manage-job-postings/manage-job-postings.component';
import { JobComponent } from './pages/admin/job/job.component';
import { ManagementComponent } from './pages/employer/management/management.component';
import { JobSearchComponent } from './pages/job-search/job-search.component';
import { UserManagementComponent } from './pages/admin/user-management/user-management.component';
import { ManageEnrolmentComponent } from './pages/manage-enrolment/manage-enrolment.component';
import { PostJobValueComponent } from './pages/employer/post-job-value/post-job-value.component';
import { PutJobValueComponent } from './pages/employer/put-job-value/put-job-value.component';
import { TestComponent } from './test/test.component';
import { SignInComponent } from './pages/others/sign-in/sign-in.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PostCompanyComponent } from './pages/others/post-company/post-company.component';
import { EnrolmentComponent } from './pages/employer/enrolment/enrolment.component';
import { EmployerLayoutComponent } from './pages/employer/employer-layout/employer-layout.component';
import { AdminLayoutComponent } from './pages/admin/admin-layout/admin-layout.component';
import { JobManagementComponent } from './pages/admin/job-management/job-management.component';
import { UploadCvComponent } from './pages/others/upload-cv/upload-cv.component';
import { JobDetailComponent } from './pages/job-detail/job-detail.component';
import { UnauthorizedComponent } from './pages/others/unauthorized/unauthorized.component';


@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    PostJobComponent,
    PutJobComponent,
    ManageJobPostingsComponent,
    JobSearchComponent,
    UserManagementComponent,
    JobComponent,
    ManageEnrolmentComponent,
    JobComponent,
    ManagementComponent,
    PostJobValueComponent,
    PutJobValueComponent,
    TestComponent,
    SignInComponent,
    PostCompanyComponent,
    EnrolmentComponent,
    EmployerLayoutComponent,
    AdminLayoutComponent,
    JobManagementComponent,
    UploadCvComponent,
    JobDetailComponent,
    UnauthorizedComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,

    MatToolbarModule,
    MatButtonModule,
    MatPaginatorModule,
    MatInputModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSidenavModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatTableModule,
    MatSort,
    MatSortModule,
    MatRadioModule,
    MatCheckboxModule
  
  
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
