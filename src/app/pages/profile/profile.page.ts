import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  userLogin = this.route.snapshot.paramMap.get("userLogin");
  myProfile: any = [];

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
    ) { }



  ngOnInit() {
    this.viewProfile();
  }

  viewProfile(){
    this.userService.getProfile(this.userLogin)
    .subscribe( data => {
      this.myProfile = data;
    }, err => console.log(err)
    )
  }
}
