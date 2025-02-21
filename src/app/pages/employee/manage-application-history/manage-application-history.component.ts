import { Component, OnInit } from '@angular/core';
import { UserjobService } from '../../../services/userjob/userjob.service';
//import { state } from '@angular/animations';
import { Enrolment } from '../../../models/enrolment/enrolment';
import { CloudsService } from '../../../services/clouds/clouds.service';
import { EnrolmentService } from '../../../services/enrolment/enrolment.service';
import { JobService } from '../../../services/job/job.service';
import { Account } from '../../../models/account/account';

@Component({
  selector: 'app-manage-application-history',
  templateUrl: './manage-application-history.component.html',
  styleUrl: './manage-application-history.component.css'
})
export class ManageApplicationHistoryComponent implements OnInit{
constructor(private http: UserjobService, private erms: EnrolmentService,
              private cls: CloudsService, private js: JobService){

}

  account: Account;
ngOnInit(): void {
  this.account = this.cls.get('account');
  this.TaiDSEnrolment()
 this.TaiJobTille()
 }

 DSEnrolment: any[];
  DSjobtilte: any[];
  showSuccess: boolean = false;
  showError: boolean = false;
  showModal: boolean = false;
  showfailure: boolean = false;
  selectedProfile: any; // Biến để lưu thông tin chi tiết của bản ghi được chọn
  keyworState: String = '';
  keyword: string = '';
  keywordJobtitle = '';

  timKiemEnrolment(): void {
    console.log('Keyword:', this.keyword)
    if (this.keyword.trim() !== '' || this.keywordJobtitle.trim()  !== '' || this.keyworState.trim() !== '' ) {
      this.http.Layenrolmentlist().subscribe(data => { // Fetch all students
        this.DSEnrolment = data.filter(i =>{
          const keyaccountname = this.keyword.trim() === '' || i.name.toLowerCase().includes(this.keyword.toLowerCase());
          const keyJobtitle =   this.keywordJobtitle.trim() === ''   || i.jobtitle.toLowerCase() == this.keywordJobtitle.toLowerCase();
          const keyState =  this.keyworState.trim() === '' ||  parseFloat(i.state) === parseFloat(this. keyworState.toString());

          return keyaccountname && keyJobtitle && keyState;
      });
      });
    } else {
      this. TaiDSEnrolment(); // If no keyword, reload the entire student list
    }
  }

  downloadCV(id: number): void {
    this.http.downloadFile(id);
  }
  

  TaiJobTille(): void {
    this.http.Layenrolmentlist().subscribe(data => { 
      this.DSEnrolment = data; 
      this.DSjobtilte = [...new Set(this.DSEnrolment.map(i=> i.jobtitle))]; // Lọc địa chỉ duy nhất

     });
  }


  viewProfile(profile: any) {
    
    this.selectedProfile = profile;  // Lưu thông tin vào biến
    this.showModal = true;     // Hiển thị modal
    console.log('Show Modal:', this.showModal);
    console.log(this.selectedProfile)
  }


  closeModal() {
    this.showModal = false;
  }



  CapNhattuchoi(enrolment: Enrolment, Newstate: number) {
    enrolment.state = Newstate;
    this.http.capnhapenrolment(enrolment).subscribe(data => {
      this.DSEnrolment = data;
      this.showfailure = true;
      // Ẩn thông báo sau 3 giây
      setTimeout(() => {
        this.showfailure = false;
      }, 2000);
    
    },
    error => {
      this.showError = true;
      // Ẩn thông báo sau 3 giây
      setTimeout(() => {
        this.showError = false;
      }, 2000);
    }
  );
  this.TaiDSEnrolment();
  }

  CapNhatDuyet(enrolment: Enrolment, Newstate: number) {
    enrolment.state = Newstate;
    this.http.capnhapenrolment(enrolment).subscribe(data => {
      this.DSEnrolment = data;
      this.showSuccess = true;
      // Ẩn thông báo sau 3 giây
      setTimeout(() => {
        this.showSuccess = false;
      }, 2000);
     // alert('Cập nhật trạng thái thành công!');
    this.TaiDSEnrolment();
    },
    error => {
      this.showError = true;
      //alert('Có lỗi khi cập nhật trạng thái.');
      // Ẩn thông báo sau 3 giây
      setTimeout(() => {
        this.showError = false;
      }, 2000);
    }
  );
 
  }

  TaiDSEnrolment() {
    this.erms.getEnrolmentlistByAccount(this.account.ID).subscribe(data => {
      this.DSEnrolment = data;
      this.DSEnrolment = this.DSEnrolment
      console.log('Search results for:',  this.DSEnrolment);
    });
  }



}
