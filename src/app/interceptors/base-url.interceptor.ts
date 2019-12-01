import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'environments/environment.prod';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    public toastController: ToastController
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const url = environment.apiUrl;
   
    request = request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT , DELETE',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        'X-Custom-Header': 'x-header-value'
      },
      url: url + request.url
      
    });
      return next.handle(request).pipe(
        map((event: HttpEvent<any>) => {

          if (event instanceof HttpResponse) {
            console.log('event--->>>', event);
          }
          return event;
        }),
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            if (error.error.success === false) {
              this.presentToast('Login failed');
            } else {
              this.router.navigate(['login']);
            }
          }
          return throwError(error);
        }));
      }
  

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

  
}
