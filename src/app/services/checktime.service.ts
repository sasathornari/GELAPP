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

  getTMAByEmpId(id: string): Observable<TimeAttendance[]>{
    return this.http.get<TimeAttendance[]>(`project/tma/emp/${id}`);
  }

  getCurrentTMAByEmId(id: string,locate: string, dateIn: string): Observable<TimeAttendance[]>{
    return this.http.get<TimeAttendance[]>(`project/currentTMA/${id},${locate},${dateIn}`);
  }

  getTMAByProjId(projId: string){
    return this.http.get(`project/tma/pro/${projId}`);
  }

  

  saveTMA(value: TimeAttendance): Observable<TimeAttendance[]>{
    return this.http.post<TimeAttendance[]>(`project/tma`, value);
  }

  
  updateTMA(id: string, value: TimeAttendance): Observable<TimeAttendance[]>{
    return this.http.put<TimeAttendance[]>(`project/tma/${id}`, value);
  }
}
