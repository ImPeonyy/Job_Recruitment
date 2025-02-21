import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Enrolment } from '../../../models/enrolment/enrolment';
import { MatTableDataSource } from '@angular/material/table';
import { UserjobService } from '../../../services/userjob/userjob.service';
import { EnrolmentService } from '../../../services/enrolment/enrolment.service';
import { CloudsService } from '../../../services/clouds/clouds.service';
import { JobService } from '../../../services/job/job.service';
import { Account } from '../../../models/account/account';
import { Company } from '../../../models/company/company';

@Component({
  selector: 'app-enrolment',
  templateUrl: './enrolment.component.html',
  styleUrl: './enrolment.component.css'
})
export class EnrolmentComponent implements OnInit {
  DSEnrolment: any[] = [];
  DSjobtilte: any[] = [];
  showSuccess: boolean = false;
  showError: boolean = false;
  showModal: boolean = false;
  showfailure: boolean = false;
  selectedProfile: any;
  selectedRanking: string = '';  // Variable to store selected ranking
  keyworState: string = '';
  keyword: string = '';
  keywordJobtitle: string = '';
  keywordRanking: string = '';
  showModalRanking: boolean = false;
  constructor(private http: UserjobService) {}

  ngOnInit(): void {
    this.TaiDSEnrolment();
    this.TaiJobTille();
  }

  // Phương thức tìm kiếm danh sách enrollments
timKiemEnrolment(): void {
  // In ra từ khóa tìm kiếm trong console để kiểm tra
  console.log('Keyword:', this.keyword);

  // Kiểm tra xem có từ khóa nào được nhập hay không
  if (this.keyword.trim() || this.keywordJobtitle.trim() || this.keyworState.trim() || this.keywordRanking.trim()) {
    
    // Nếu có từ khóa, gọi API để lấy danh sách enrollments
    this.http.Layenrolmentlist().subscribe(data => {
      
      // Lọc danh sách dựa trên các điều kiện từ khóa
      this.DSEnrolment = data.filter(i => {
        
        // Kiểm tra điều kiện tìm kiếm theo tên tài khoản (Accountname)
        // Nếu không có từ khóa tìm kiếm thì luôn true, nếu có thì kiểm tra xem tên tài khoản có chứa từ khóa không (không phân biệt chữ hoa/thường)
        const keyAccountName = !this.keyword || i.Accountname.toLowerCase().includes(this.keyword.toLowerCase());
        
        // Kiểm tra điều kiện tìm kiếm theo chức danh công việc (jobtitle)
        // Nếu không có từ khóa tìm kiếm thì luôn true, nếu có thì kiểm tra xem chức danh có trùng khớp với từ khóa không (không phân biệt chữ hoa/thường)
        const keyJobTitle = !this.keywordJobtitle || i.jobtitle.toLowerCase() === this.keywordJobtitle.toLowerCase();
        
        // Kiểm tra điều kiện tìm kiếm theo trạng thái (state)
        // Nếu không có từ khóa tìm kiếm thì luôn true, nếu có thì so sánh giá trị trạng thái với từ khóa (sử dụng parseFloat để chuyển sang kiểu số)
        const keyState = !this.keyworState || parseFloat(i.state) === parseFloat(this.keyworState);
        
        // Kiểm tra điều kiện tìm kiếm theo xếp hạng (ranking)
        // Nếu không có từ khóa tìm kiếm thì luôn true, nếu có thì so sánh giá trị xếp hạng với từ khóa (sử dụng parseInt để chuyển sang kiểu số nguyên)
        const keyRanking = !this.keywordRanking || parseInt(i.ranking) === parseInt(this.keywordRanking);
        
        // Trả về true nếu tất cả các điều kiện trên đều thỏa mãn, nghĩa là phần tử đó sẽ được giữ lại trong danh sách kết quả
        return keyAccountName && keyJobTitle && keyState && keyRanking;
      });
    });
  } else {
    // Nếu không có từ khóa nào được nhập, gọi phương thức TaiDSEnrolment() để tải lại toàn bộ danh sách enrollments
    this.TaiDSEnrolment();
  }
}

  TaiJobTille(): void {
    this.http.Layenrolmentlist().subscribe(data => {
      this.DSEnrolment = data;
      this.DSjobtilte = [...new Set(this.DSEnrolment.map(i => i.jobtitle))];
    });
  }

  viewProfile(profile: any) {
    this.selectedProfile = profile;
    this.showModal = true;
  }

  closeModal1() {
    this.showModalRanking = false;
  }
  closeModal() {
    this.showModal = false;
  }

  saveRanking() {
    console.log(this.selectedRanking);
    // Kiểm tra nếu người dùng chưa chọn Ranking
    if (!this.selectedRanking) {
      console.error('Ranking is required.');
      this.showError = true; // Hiển thị lỗi
      setTimeout(() => (this.showError = false), 2000); // Ẩn lỗi sau 2 giây
      return;
    }
  
    // Tạo payload với đầy đủ các trường và khớp định nghĩa Enrolment
    const updatedEnrolment: Enrolment = {
      ID: this.selectedProfile, // ID khớp với định nghĩa Enrolment
      job: 0, // Giá trị mặc định hoặc giá trị từ đối tượng hiện có
      account: 0, // Giá trị mặc định hoặc giá trị từ đối tượng hiện có
      cv: 'string', // Giá trị mặc định hoặc lấy từ dữ liệu hiện có
      rank: parseInt(this.selectedRanking, 10), // Giá trị ranking từ người dùng
      state: 1, // Giá trị mặc định hoặc giá trị từ đối tượng hiện có
      file: null
    };
  
    console.log('Payload gửi lên:', updatedEnrolment);
  
    // Gửi yêu cầu cập nhật qua service
    this.http.capnhapranking(updatedEnrolment).subscribe(
      (response) => {
        console.log('Ranking updated successfully:', response);
  
        // Hiển thị thông báo thành công
        this.showSuccess = true;
        setTimeout(() => (this.showSuccess = false), 2000);
  
        // Tải lại danh sách Enrolment
        this.TaiDSEnrolment();
  
        // Đóng modal
        this.closeModal();
      },
      (error) => {
        console.error('Error updating ranking:', error);
  
        // Hiển thị thông báo lỗi
        this.showError = true;
        setTimeout(() => (this.showError = false), 2000);
      }
    );
  }
  
  
  
  
  
  CapNhattuchoi(enrolment: Enrolment, Newstate: number) {
    enrolment.state = Newstate;
    this.http.capnhapenrolment(enrolment).subscribe(data => {
      this.DSEnrolment = data;
      this.showfailure = true;
      setTimeout(() => this.showfailure = false, 2000);
    }, error => {
      this.showError = true;
      setTimeout(() => this.showError = false, 2000);
    });
  }
  openRankingModal(id: number) {

    console.log("Selected Enrolment ID:", id);
  
    // Store the ID of the selected enrolment
    this.selectedProfile = id;
  
    // Show the modal (or do other necessary actions)
    this.showModalRanking = true;
  
    // Log to confirm modal state
    console.log("Modal Opened:", this.showModalRanking);
  }
  
  
  CapNhatDuyet(enrolment: Enrolment, Newstate: number) {
    enrolment.state = Newstate;
    this.http.capnhapenrolment(enrolment).subscribe(data => {
      this.DSEnrolment = data;
      this.showSuccess = true;
      setTimeout(() => this.showSuccess = false, 2000);
      this.TaiDSEnrolment();
    }, error => {
      this.showError = true;
      setTimeout(() => this.showError = false, 2000);
    });
  }

  TaiDSEnrolment() {
    this.http.Layenrolmentlist().subscribe(data => {
      this.DSEnrolment = data;
      console.log(this.DSEnrolment);
    });
  }
}
