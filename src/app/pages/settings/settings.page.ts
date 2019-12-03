import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'app/models/User';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  userlogin: any;
  myProfile: any = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userlogin = localStorage.getItem('token');
    this.viewProfile(this.userlogin);
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/home/checktime']);
  }

  viewProfile(user: any){
    this.userService.getProfile(user)
    .subscribe( res => {
      this.myProfile = res;
    },
      err => console.log(err)
    )
  }

}
