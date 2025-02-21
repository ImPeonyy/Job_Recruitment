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
import { IndexComponent } from './pages/others/index/index.component';
import { PostJobComponent } from './pages/employer/post-job/post-job.component';
import { PutJobComponent } from './pages/employer/put-job/put-job.component';
import { JobSearchComponent } from './pages/others/job-search/job-search.component';
import { UserManagementComponent } from './pages/admin/user-management/user-management.component';
import { PostJobValueComponent } from './pages/employer/post-job-value/post-job-value.component';
import { PutJobValueComponent } from './pages/employer/put-job-value/put-job-value.component';
import { SignInComponent } from './pages/others/sign-in/sign-in.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PostCompanyComponent } from './pages/others/post-company/post-company.component';
import { EnrolmentComponent } from './pages/employer/enrolment/enrolment.component';
import { EmployerLayoutComponent } from './pages/employer/employer-layout/employer-layout.component';
import { ManageApplicationHistoryComponent } from './pages/employee/manage-application-history/manage-application-history.component';
import { AdminLayoutComponent } from './pages/admin/admin-layout/admin-layout.component';
import { JobManagementComponent } from './pages/admin/job-management/job-management.component';
import { UploadCvComponent } from './pages/employee/upload-cv/upload-cv.component';
import { JobDetailComponent } from './pages/others/job-detail/job-detail.component';
import { UnauthorizedComponent } from './pages/others/unauthorized/unauthorized.component';
import { JobComponent } from './pages/employer/job/job.component';
import { AboutUsComponent } from './pages/others/about-us/about-us.component';
import { EmployeeLayoutComponent } from './pages/employee/employee-layout/employee-layout.component';
import { ProfileComponent } from './pages/employee/profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    PostJobComponent,
    PutJobComponent,
    JobSearchComponent,
    UserManagementComponent,
    PostJobValueComponent,
    PutJobValueComponent,
    SignInComponent,
    PostCompanyComponent,
    EnrolmentComponent,
    EmployerLayoutComponent,
    ManageApplicationHistoryComponent,
    AdminLayoutComponent,
    JobManagementComponent,
    UploadCvComponent,
    JobDetailComponent,
    UnauthorizedComponent,
    JobComponent,
    AboutUsComponent,
    EmployeeLayoutComponent,
    ProfileComponent,
    
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
