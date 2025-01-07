import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  readonly REST_API_SERVER = 'https://localhost:7275/api';
  private httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
      }),
  };
    constructor(private http: HttpClient) { }

    public get(): Observable<any> {
      const url = `${this.REST_API_SERVER}/Company`;
      return this.http.get<any>(url, this.httpOptions);
    }

    public post(body): Observable<any> {
      const url = `${this.REST_API_SERVER}/Company`;
      return this.http.post<any>(url, body);
    }

    public put(body): Observable<any> {
      const url = `${this.REST_API_SERVER}/Company`;
      return this.http.put<any>(url, body, this.httpOptions);
    }

    public delete(id): Observable<any> {
      const url = `${this.REST_API_SERVER}/Company/${id}`;
      return this.http.delete<any>(url, this.httpOptions);
    }
}
