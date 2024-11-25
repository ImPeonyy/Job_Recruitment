import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from '../../models/account/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  readonly REST_API_SERVER = 'https://localhost:7275/api';
  private httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
      }),
  };
    constructor(private http: HttpClient) { }

    public get(account: Account): Observable<any> {
      const url = `${this.REST_API_SERVER}/Account`;
      return this.http.get<any>(url, this.httpOptions);
    }

    public post(body): Observable<any> {
      const url = `${this.REST_API_SERVER}/Account`;
      return this.http.post<any>(url, body, this.httpOptions);
    }

    public put(body): Observable<any> {
      const url = `${this.REST_API_SERVER}/Account`;
      return this.http.put<any>(url, body, this.httpOptions);
    }

    public delete(id): Observable<any> {
      const url = `${this.REST_API_SERVER}/Account/${id}`;
      return this.http.delete<any>(url, this.httpOptions);
    }

    public getAccByEmail(email: string): Observable<any> {
      const url = `${this.REST_API_SERVER}/Account/GetAccByEmail?email=${email}`;
      return this.http.get<any>(url, this.httpOptions);
    }

    
}

