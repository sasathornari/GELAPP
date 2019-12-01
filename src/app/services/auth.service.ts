import { Injectable } from "@angular/core";
import { StorageService } from "./storage.service";
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { tap, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: "root"
})
export class AuthService {

  constructor(
    private http: HttpClient
    ) {}
    
    login (data): Observable<any> {
      return this.http.post<any>('login', data)
        .pipe(
          tap(_ => this.log('login')),
          catchError(this.handleError('login', []))
        );
    }
  
    // logout (): Observable<any> {
    //   return this.http.get<any>('signout')
    //     .pipe(
    //       tap(_ => this.log('logout')),
    //       catchError(this.handleError('logout', []))
    //     );
    // }
  
    // register (data): Observable<any> {
    //   return this.http.post<any>(this.apiUrl + 'signup', data)
    //     .pipe(
    //       tap(_ => this.log('login')),
    //       catchError(this.handleError('login', []))
    //     );
    // }
  
    private handleError<T> (operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
  
        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead
  
        // TODO: better job of transforming error for user consumption
        this.log(`${operation} failed: ${error.message}`);
  
        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }
  
    /** Log a HeroService message with the MessageService */
    private log(message: string) {
      console.log(message);
    }
}
