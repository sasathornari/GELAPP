import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment.prod';

@Injectable({
  providedIn: "root"
})
export class HttpService {
  constructor(private http: HttpClient) {}

  headers = new HttpHeaders({'Content-Type':'application/json'});
  options = { headers: this.headers, withCredintials: false };
  url = environment.apiUrl;
  post(serviceName: string, data: any) {
    console.log(data);
    console.log(this.headers);
    return this.http.post(serviceName, JSON.stringify(data), this.options);
  }


}
