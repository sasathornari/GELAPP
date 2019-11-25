import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { StorageService } from "./storage.service";
import { Router } from "@angular/router";
import { AuthConstants } from "app/config/auth-constants";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(
    private httpService: HttpService,
    private storageService: StorageService,
    private router: Router
  ) {}

  login(postData: any): Observable<any> {
    console.log(postData);
    return this.httpService.post(`/user`, postData);
  }

  logout() {
    this.storageService.removeStorageItem(AuthConstants.AUTH).then(res => {
      this.router.navigate([`/login`]);
    });
  }

  userlogin(postData: any) {
    return this.httpService.post(`userlogin`, postData);
  }
  
}
