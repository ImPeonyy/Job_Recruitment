import { Component,OnInit  } from '@angular/core';
import { UserjobService } from '../../../services/userjob/userjob.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent implements OnInit{
  constructor(private http: UserjobService) {
    }

    ngOnInit(): void {
      this.LayDSRole();
      this.TaiDSUser();
    }

    DS: any[];
    public DSUser: any[];
    public DSRole: any[];

    public DdSUser: any[];
    keyworRole: String = '';
    keyword: string = '';
    



    XoaUser(id: number): void {
      if (confirm('Are you sure you want to delete this user?')) {
      this.http.XoaUser(id).subscribe(data => {
      console.log('User deleted:', data);
      this.DSUser = this.DSUser.filter(i => i.ID !== id);
    },
      error => {
      console.error('Error deleting user:', error);
      alert('Failed to delete the user. Please try again.');
    }
    );
    }
  }

    timKiemUser(): void {
      console.log('Keyword:', this.keyword)
      if (this.keyword.trim() !== '') {
        this.http.LayDLUser().subscribe(data => { // Fetch all students
          this.DSUser = data.filter(i =>
            i.name.toLowerCase().includes(this.keyword.toLowerCase())
          );
          console.log('ds user:', this.DSUser)
        });
      } else {
        this.TaiDSUser(); // If no keyword, reload the entire student list
      }
    }
  
    ChonRole(): void {
      console.log('role:', this.keyworRole)
      if (this.keyworRole) {
       
           // Lọc danh sách người dùng theo vai trò được chọn
        this.http.LayDLUser().subscribe(data => { // Fetch all students
          console.log('Dữ liệu nhận từ API:', data);
          this.DSUser = data.filter(i =>
            parseFloat(i.role) === parseFloat(this.keyworRole.toString()));
            //i.role.parseFloat() === this.keyworRole.parseFloat());
          console.log('ds user:', this.DSUser)
        });
      } else {
        this.TaiDSUser(); // If no keyword, reload the entire student list
      }
    }



    LayDSRole() {
      this.http.LayDLUser().subscribe(data => { 
        this.DS = data; 
        this.DSRole = [...new Set(this.DS.map(i => i.role))]; // Lọc địa chỉ duy nhất
        console.log('Role:', this.DSRole); });
      }

    TaiDSUser() {
      this.http.LayDLUser().subscribe(data => {
        this.DSUser = data;
        this.DdSUser = this.DSUser
        console.log('Search results for:',  this.DdSUser);
      });
    }

   }


