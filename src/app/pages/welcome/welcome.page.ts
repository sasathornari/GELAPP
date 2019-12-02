import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  userlogin: string;
  
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.userlogin = localStorage.getItem('token');
  }

}
