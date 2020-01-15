import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastService } from "app/services/toast.service";
import { UserService } from "app/services/user.service";
import { User } from 'app/models/User';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';



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
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private toastService: ToastService,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      'username' : [null, Validators.required],
      'password' : [null, Validators.required]
    });
    
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
    const myUsername = (Number(this.postData.username.substring(4,10))-543) + '-'+ this.postData.username.substring(2,4)+ '-'+ this.postData.username.substring(0,2);
    console.log(myUsername)
    //console.log(new Date(myUsername))
      if (this.validateInputs()) {     
       this.userService.getUsersApp(myUsername,this.postData.password)
       .subscribe(data => {
         console.log(data.length);
         const result = data.length;
         if(result === 1){
              this.toastService.presentToast('ยินดีต้อนรับ คุณ'+ data[0].EMP_NAME+' เข้าสู่ระบบ');
              //this.router.navigate(['home/checktime',{userLogin: this.postData.username}])
              this.router.navigate(['home/checktime']);
              localStorage.setItem('token', this.postData.username);
              

          }else{
            this.toastService.presentToast('กรุณาระบุชื่อและรหัสผ่านผู้ใช้งาน');
          }
       },
         err => {
          this.toastService.presentToast('กรุณาระบุชื่อและรหัสผ่านผู้ใช้งาน');
           console.log(err)
         }
       )
       // this.router.navigate(['home/checktime']);

      }else{
        this.toastService.presentToast('กรุณาระบุชื่อและรหัสผ่านผู้ใช้งาน')
      }


    }
   


  // onFormSubmit(form: NgForm) {
  //     this.authService.login(form)
  //       .subscribe(res => {
  //         if (res.token) {
  //           localStorage.setItem('token', res.token);
  //           this.router.navigate(['checktime']);
  //         }
  //       }, (err) => {
  //         console.log(err);
  //       });
  //   }

  }



