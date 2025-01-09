import { Component, OnInit } from '@angular/core';
import { UserjobService } from '../../../services/userjob/userjob.service';
import { Job } from '../../../models/job/job';

@Component({
  selector: 'app-job-search',
  templateUrl: './job-search.component.html',
  styleUrl: './job-search.component.css'
})
export class JobSearchComponent implements OnInit{

  imageUrl: string = 'assets/img/1234.jpg';

  constructor(private http: UserjobService) {
    
  }
  DSJob: any[];
  keyword: string = '';
  job_title: string = '';
  message: string = ''; 

  public DSDiaChi: any[];
  keywordaddress: string= '';
  keywordCompany: string= '';
  keywordJobtype: string= '';
  keywordSalary: string= '';
  keywordEXP: string= '';
  keywordjobtitle: string= '';
  // keywordSearchCompany: string= '';
  diachi: any;

  DSCompany: any[];
  DSTenCongTy: any[];
  DSDLJobType: any[];
  DSDLjobtitle: any[];


  ngOnInit(): void {
  
  this.LayDSDiaChi();
  this.LayDSCongTy();
  this.TaiDSJob();
  this.LayDSDLJobType();
  this.LayDSDLjobtitle();
  }
  
  LayDSDiaChi() {
  this.http.LayDLProvince().subscribe(data => { 
    this.DSJob = data; 
    this.DSDiaChi = [...new Set(this.DSJob.map(i=> i.province_name))]; 
    console.log('address:', this.DSDiaChi); });
  }


  TaiDSJob() {
    this.http.Layjoblist().subscribe(data => {
      this.DSJob = data;
      console.log('DS:', this.DSJob);
    });
  }


  LayDSCongTy() {
    this.http.LayDLCompany().subscribe(data => { 
      this.DSCompany = data; 
      this.DSTenCongTy = [...new Set(this.DSCompany.map(i=> i.company_name))]; 
      console.log('Company:', this.DSTenCongTy); });

    }

    LayDSDLjobtitle() {
      this.http.Layjoblist().subscribe(data => { 
        this.DSJob = data; 
        this.DSDLjobtitle = [...new Set(this.DSJob.map(i=> i.JobTitleDescription))]; 
        console.log('Jobtitle:', this.DSDLjobtitle); });
      }

    Chonjobtitle(): void {
      if (this.keywordjobtitle) {
           // Lọc danh sách job theo vai trò được chọn
        this.http.Layjoblist().subscribe(data => { // Fetch all students
          this.DSJob = data.filter(i =>
            i.JobTitleDescription.toLowerCase() === this.keywordjobtitle.toLowerCase());
          console.log('ds Jobtitle:', this.DSJob)
        });
      } else {
        this.TaiDSJob(); // If no keyword, reload the entire student list
      }
    }


    LayDSDLJobType() {
      this.http.Layjoblist().subscribe(data => { 
        this.DSJob = data; 
        this.DSDLJobType = [...new Set(this.DSJob.map(i=> i.type_name))]; 
        console.log('Job-Type:', this.DSDLJobType); });
      }
    
    ChonJobType(): void {
      if (this.keywordJobtype) {
           // Lọc danh sách job theo vai trò được chọn
        this.http.Layjoblist().subscribe(data => { // Fetch all students
          this.DSJob = data.filter(i =>
            i.type_name.toLowerCase() === this.keywordJobtype.toLowerCase());
          console.log('ds job:', this.DSJob)
        });
      } else {
        this.TaiDSJob(); // If no keyword, reload the entire student list
      }
    }

    ChonSalary(): void {
      if (this.keywordSalary) {
        console.log('key salary:', this.keywordSalary)
        const [Minsalary, Maxsalary] = this.keywordSalary.split('-'); // Tách giá trị khoảng lương
        const minSalary = parseFloat(Minsalary); // Chuyển đổi sang số
        const maxSalary = Maxsalary === 'more' ? Infinity : parseFloat(Maxsalary); // 'more' thành Infinity
        // Lọc danh sách job theo vai trò được chọn
        this.http.Layjoblist().subscribe(data => { // Fetch all students
        this.DSJob = data.filter(i => {
        const salary = parseFloat(i.MinSalary); // Giả sử `job.salary` là chuỗi số        
        return salary >= minSalary && salary <= maxSalary;;
      }); 
      console.log('ds Salary:', this.DSJob);
    });
   } else {
     this.TaiDSJob(); // If no keyword, reload the entire student list
   }
  }

  ChonEXP(): void {
    if (this.keywordEXP) {
      console.log('key EXP:', this.keywordEXP)
      const [Minexp, Maxexp] = this.keywordEXP.split('-'); // Tách giá trị khoảng lương
      const minexp = parseFloat(Minexp); // Chuyển đổi sang số
      const maxexp = Maxexp === 'more' ? Infinity : parseFloat(Maxexp); // 'more' thành Infinity
      // Lọc danh sách job theo vai trò được chọn
      this.http.Layjoblist().subscribe(data => { // Fetch all students
      this.DSJob = data.filter(i => {
      const exp = parseFloat(i.MinExperience); // Giả sử `job.salary` là chuỗi số        
      return exp >= minexp && exp <= maxexp;;
    }); 
    console.log('ds exp:', this.DSJob);
  });
 } else {
   this.TaiDSJob(); // If no keyword, reload the entire student list
 }
}


  timKiemJob(): void {
    console.log('Keyword:', this.keyword);
    console.log('Address Keyword:', this.keywordaddress);
    console.log('Company Keyword:', this.keywordCompany);

    if (this.keyword.trim() !== '' || this.keywordaddress.trim() !== '' || this.keywordCompany.trim() !== ''){ 
      this.http.Layjoblist().subscribe(data => { // lấy danh sách job
        this.DSJob = data.filter(job => {
          const keywordMatch = this.keyword.trim() === '' || job.title.toLowerCase().includes(this.keyword.toLowerCase()) || job.CompanyName.toLowerCase().includes(this.keyword.toLowerCase());
          const addressMatch = this.keywordaddress.trim() === '' || job.Location.toLowerCase() === this.keywordaddress.toLowerCase();
          const addCompany = this.keywordCompany.trim() === '' || job.CompanyName.toLowerCase() === this.keywordCompany.toLowerCase();

          return keywordMatch && addressMatch && addCompany;
        });
  
        console.log('Jobs:', this.DSJob);
      });
    } else {
      this.TaiDSJob(); // Nếu không có từ khóa hoặc địa chỉ, tải lại toàn bộ danh sách job
    }
  
    // this.message = `Search results for: ${this.keyword ? this.keyword : 'all jobs'} at ${this.keywordaddress ? this.keywordaddress : 'all locations'}`;
  }
  
  
}
