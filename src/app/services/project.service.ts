import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { Project } from 'app/models/Project';
import { TimeAttendance } from 'app/models/TimeAttendance';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    })
  }

  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}, ` +
        `error: ${error.name}`
      );
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };


  getAllProjectAX() {
    //console.log(`/projectAX`);
    return this.http.get(`projectAX`);
  }

  getListProject() {   
    return this.http.get(`project`);
  }

  getProjectInLoaction(lat,latAdd,lng,lngAdd){
    return this.http.get(`project/location/${lat},${latAdd},${lng},${lngAdd}`)
  }
  
  
}
