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

  userLogin = this.route.snapshot.paramMap.get("userLogin");
  myProfile: any = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.viewProfile();
  }

  logout(){
    this.router.navigate(['/login']);
  }

  viewProfile(){
    this.userService.getProfile(this.userLogin)
    .subscribe( data => {
      this.myProfile = data;
    }, err => console.log(err)
    )
  }

}
