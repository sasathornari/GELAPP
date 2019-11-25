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

  authenticationState = new BehaviorSubject(false);

  constructor(
    private httpService: HttpService,
    private storageService: StorageService,
    private router: Router,
    private storage: Storage,
    private plt: Platform
  ) {
    this.plt.ready().then(() => {
      this.chekckToken();
    });
  }

  login(){
    return this.storage.set(TOKEN_KEY, 'Bearer 123456').then(res => {
      this.authenticationState.next(true);
    });
  }

  logout() {
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }

  isAuthenticated(){
    return this.authenticationState.value;
  }
  
  chekckToken(){
    return this.storage.get(TOKEN_KEY).then(res => {
      if(res){
        this.authenticationState.next(true);
      }      
    });
  }
}
