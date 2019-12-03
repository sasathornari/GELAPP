import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  userlogin: any;
  constructor() { }

  ngOnInit() {
    this.userlogin = localStorage.getItem('token');
  }

}
