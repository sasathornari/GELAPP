import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  userLogin = this.route.snapshot.paramMap.get("userLogin");

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    console.log(this.userLogin)
  }

}
