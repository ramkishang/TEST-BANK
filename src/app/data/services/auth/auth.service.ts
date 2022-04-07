import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from "@angular/common/http";
import { from, Observable } from "rxjs";
import { environment } from 'src/app/environments/environment';

const httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Method": "POST",
      "Access-Control-Allow-Headers":
        "Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With",
      "Access-Control-Request-Headers":
        "access-control-allow-origin, content-type"
    })
};
@Injectable({
    providedIn: 'root'
})
export class AuthService {
  headers: HttpHeaders | { [header: string]: string | string[]; } = new HttpHeaders;
  private readonly apiKey = environment.apiKey;
  constructor(private httpClient: HttpClient) { }

  login(data:any): Observable<any> {
    const headers = {'API-KEY': this.apiKey, 'Content-Type': 'application/json' };
    return this.httpClient.post<any>(environment.url + 'auth/login', data, { headers });
  }
  adminLogin(data:any): Observable<any> {
    const headers = {'API-KEY': this.apiKey, 'Content-Type': 'application/json' };
    return this.httpClient.post<any>(environment.url + 'auth/loginAdmin', data, { headers });
  }
  adminLogout(data:any): Observable<any> {
    const headers = {'API-KEY': this.apiKey, 'Content-Type': 'application/json' };
    return this.httpClient.post<any>(environment.url + 'auth/logoutAdmin',data, { headers });
  }
  logout(data:any): Observable<any> {
    const headers = {'API-KEY': this.apiKey, 'Content-Type': 'application/json' };
    return this.httpClient.post<any>(environment.url + 'auth/logout',data, { headers });
  }
}