import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TimeAttendance } from 'app/models/TimeAttendance';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChecktimeService {

  constructor(
    private http: HttpClient
    ) { }

  getListTMA(){
    return this.http.get(`project/tma`);
  }

  getTMAByEmpId(id: string){
    return this.http.get(`project/tma/emp/${id}`);
  }

  getTMAByProjId(projId: string){
    return this.http.get(`project/tma/pro/${projId}`);
  }

  saveTMA(value: TimeAttendance): Observable<TimeAttendance[]>{
    return this.http.post<TimeAttendance[]>(`project/tma`, value);
  }
}
