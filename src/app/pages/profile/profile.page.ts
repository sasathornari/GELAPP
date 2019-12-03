import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  userlogin: any;
  myProfile: any = [];

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
    ) { }



  ngOnInit() {
    this.userlogin = localStorage.getItem('token');
    this.viewProfile();
  }

  viewProfile(){
    this.userService.getProfile(this.userlogin)
    .subscribe( data => {
      this.myProfile = data;
    }, err => console.log(err)
    )
  }
}
