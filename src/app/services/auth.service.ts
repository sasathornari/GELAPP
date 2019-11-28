import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { StorageService } from "./storage.service";
import { Router } from "@angular/router";
import { AuthConstants } from "app/config/auth-constants";
import { Observable, BehaviorSubject } from "rxjs";
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: "root"
})
export class AuthService {
  isAuthenticated(): boolean {
    throw new Error("Method not implemented.");
  }

  constructor(
    private httpService: HttpService,
    private storageService: StorageService,
    private router: Router
    ) {}
    
    login(postData: any): Observable<any> {
    return this.httpService.post('login', postData);
    }
    
    signup(postData: any): Observable<any> {
    return this.httpService.post('signup', postData);
    }
    
    logout() {
    this.storageService.removeStorageItem(AuthConstants.AUTH).then(res => {
    this.router.navigate(['/login']);
    });
    }
}
