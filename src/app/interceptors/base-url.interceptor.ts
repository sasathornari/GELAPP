import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'environments/environment.prod';
import { Router } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';
import { AuthService } from 'app/services/auth.service';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    public toastController: ToastController,
    private authService: AuthService,
    private storage: Storage, 
    private alertCtrl: AlertController
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const url = environment.apiUrl;
    //let promise = this.storage.get('my_token');

    // private addToken(request: HttpRequest<any>, token: any) {
    //   if (token) {
    //       let clone: HttpRequest<any>;
    //       clone = request.clone({
    //           setHeaders: {
    //               Accept: `application/json`,
    //               'Content-Type': `application/json`,
    //               Authorization: `Bearer ${token}`
    //           }
    //       });
    //       return clone;
    //   }
  
    //   return request;
    // }

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
