import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthConstants } from "app/config/auth-constants";
import { AuthService } from "app/services/auth.service";
import { StorageService } from "app/services/storage.service";
import { ToastService } from "app/services/toast.service";
import { UserService } from "app/services/user.service";
import { User } from 'app/models/User';



@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  public postData = {
    username: "",
    password: ""
  };

  userLogin: any = [];
  user: User;

  constructor(
    private router: Router,
    private authService: AuthService,
    private storageService: StorageService,
    private toastService: ToastService,
    private userService: UserService
  ) {}

  ngOnInit() {
    
  }

  validateInputs() {
    let username = this.postData.username.trim();
    let password = this.postData.password.trim();

    return (
      this.postData.username &&
      this.postData.password &&
      username.length > 0 &&
      password.length > 0
    );
  }

loginAction() {
    if (this.validateInputs()) {     
     // this.userService.getUsersLogin(this.postData.username,this.postData.password)
     // .subscribe(data => {
     //   console.log(data);
     //   if(data[0]){
          
      //      this.toastService.presentToast('ยินดีต้อนรับ คุณ'+ data[0].EMP_NAME+' เข้าสู่ระบบ')
            this.router.navigate(['home/checktime',{userLogin: this.postData.username}])
          
      //  }
     // },
     //   err => console.log(err)
     // )
      
      
    }else{
      this.toastService.presentToast('กรุณาระบุชื่อและรหัสผ่านผู้ใช้งาน')
    }
  }
  


  /*loginAction() {
    if (this.validateInputs()) {
      console.log(this.postData)
      this.authService.login(this.postData).subscribe(
        (res: any) => {
          console.log(res)
          if (res[0]) {
            // Storing the User data.
            this.storageService.store(AuthConstants.AUTH, res[0]);
            this.router.navigate(["home/feed"]);
          } else {
            console.log("incorrect password.");
          }
        },
        (error: any) => {
          console.log("Network Issue.");
        }
      );
    } else {
      console.log("Please enter email/username or password.");
    }getListUser
  }*/


}
