import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  

  constructor(private http: HttpClient) { }

  getAllProjectAX() {
    //console.log(`/projectAX`);
    return this.http.get(`/projectAX`);
  }

  getListProject() {
    //console.log(`/projectAX`);
    return this.http.get(`/project`);
  }


}
