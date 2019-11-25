import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { throwError, Observable } from 'rxjs';
import { User } from 'app/models/User';
import { retry, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: "root"
})
export class UserService {

  data = [];

  constructor(
    private http: HttpClient
  ) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded, multipart/form-data, text/plain',
      'Access-Control-Allow-Origin': 'http://localhost:8100',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT , DELETE',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
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

  // Get single student data by ID
  getLogin(postData: any) {
    return this.http
      .get<User>(`userlogin/` + postData, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getUsersLogin(id: any, pass: any): Observable<User[]> {
    console.log(this.httpOptions);
    return this.http.get<User[]>(`/user/${id},${pass}`,  this.httpOptions);
  }

  getUsers(id: any, pass: any) {
    return this.http.get(`/user/${id},${pass}`, this.httpOptions);
  }

  getProfile(id: string) {
    return this.http.get(`/user/${id}`);
  }

  /*async getListUser(){
    let loading = await this.loadingCtrl.create();
    await loading.present();
  
    let nativeCall = this.nativeHttp.get(`emp`, {}, {
      'Content-Type': 'application/json'
    });
    
    from(nativeCall).pipe(
      finalize(() => loading.dismiss())
    ).subscribe( data => {
      this.data = JSON.parse(data.data);
    }, err => {
      console.log('JS Call error: ', err);
      });
  
    
  }*/
}
