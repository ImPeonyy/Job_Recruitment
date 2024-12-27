import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Enrolment } from '../../models/enrolment/enrolment';

@Injectable({
  providedIn: 'root'
})
export class UserjobService {

  readonly REST_API_SERVER = 'https://localhost:7275/api';
  private httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
      }),
  };
  constructor(private http: HttpClient) {

  }

  public Layenrolmentlist() : Observable<any[]> {
    const url = `${this.REST_API_SERVER}/Enrolment/GetListEnrolment`;
    return this.http.get<any>(url, this.httpOptions);
  }

  public capnhapenrolment(enrolment: Enrolment) : Observable<any[]> {
    const url = `${this.REST_API_SERVER}/Enrolment/Putstate`;
    return this.http.put<any>(url, enrolment, this.httpOptions);
  }

  public Layjoblist() : Observable<any[]> {
    const url = `${this.REST_API_SERVER}/Job/Getjoblist`;
    return this.http.get<any>(url, this.httpOptions);
  }

  public LayDLCompany() : Observable<any[]> {
    const url = `${this.REST_API_SERVER}/Company`;
    return this.http.get<any>(url, this.httpOptions);
  }

  public LayDLUser() : Observable<any[]> {
    const url = `${this.REST_API_SERVER}/Account`;
    return this.http.get<any>(url, this.httpOptions);
  }

  public LayDLJob() : Observable<any[]> {
    const url = `${this.REST_API_SERVER}/Job`;
    return this.http.get<any>(url, this.httpOptions);
  }

  public XoaUser(id: number) : Observable<any[]> {
    const url = `${this.REST_API_SERVER}/Account/${id}`;
    return this.http.delete<any>(url, this.httpOptions);
  }

  public capnhapranking(enrolment: Enrolment): Observable<any> {
    const url = `${this.REST_API_SERVER}/Enrolment/PutRanking`;
    return this.http.put<any>(url, enrolment, this.httpOptions);
  }









}
