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
export class BankService {
  headers: HttpHeaders | { [header: string]: string | string[]; } = new HttpHeaders;
  private readonly apiKey = environment.apiKey;
  constructor(private httpClient: HttpClient) { }

  createCutomer(data:any): Observable<any> {
    const headers = {'API-KEY': this.apiKey, 'Content-Type': 'application/json' };
    return this.httpClient.post<any>(environment.url + 'user', data, { headers });
  }
  getCustomerList(): Observable<any> {
    const headers = {'API-KEY': this.apiKey, 'Content-Type': 'application/json' };
    return this.httpClient.get<any>(environment.url + 'users', { headers });
  }
  getCustomerDetails(customerId:any): Observable<any> {
    const headers = {'API-KEY': this.apiKey, 'Content-Type': 'application/json' };
    return this.httpClient.get<any>(environment.url + 'user/'+customerId, { headers });
  }
  updateCutomer(customerId:any,data:any): Observable<any> {
    const headers = {'API-KEY': this.apiKey, 'Content-Type': 'application/json' };
    return this.httpClient.put<any>(environment.url + 'user/'+customerId, data, { headers });
  }
  getCustomerTrasanctionList(id:any): Observable<any> {
    const headers = {'API-KEY': this.apiKey, 'Content-Type': 'application/json' };
    return this.httpClient.get<any>(environment.url + 'transactions/'+id, { headers });
  }
  sendMoney(data:any): Observable<any> {
    const headers = {'API-KEY': this.apiKey, 'Content-Type': 'application/json' };
    return this.httpClient.post<any>(environment.url + 'transaction', data, { headers });
  }
  getTransactionDetails(id:any): Observable<any> {
    const headers = {'API-KEY': this.apiKey, 'Content-Type': 'application/json' };
    return this.httpClient.get<any>(environment.url + 'transaction/'+id, { headers });
  }
}
