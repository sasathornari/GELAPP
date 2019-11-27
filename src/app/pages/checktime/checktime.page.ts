import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'app/services/user.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ProjectService } from 'app/services/project.service';
import { AlertController } from '@ionic/angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastService } from 'app/services/toast.service';

@Component({
  selector: 'app-checktime',
  templateUrl: './checktime.page.html',
  styleUrls: ['./checktime.page.scss'],
})
export class ChecktimePage implements OnInit {

  projects: any = [];
  userLogin = this.route.snapshot.paramMap.get("userLogin");
  userProfile: any = [];

  lat: any;
  lng: any;

  timeToday: String;
  now: Date = new Date();
  date: Date = new Date(); 
  currentDate = this.now.toISOString().substring(0,10) + ' ' + this.now.toTimeString().substring(0,8);

  timeIn = '';
  timeOut = '';

  postData = {
    checkIn: '',
    checkOut: ''
  }

  
  constructor(
    private userService: UserService,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private geo: Geolocation,
    private alertCrtl: AlertController,
    private toastService: ToastService,
    private fb: FormBuilder
    ) 
    { 
        this.timeToday = Date.now().toString();
        setInterval(() => {
          this.now = new Date();
        }, 1);

        
    }

  ngOnInit() {
    
    console.log('load');
    this.viewProjectAssign();
    this.viewProfile(this.userLogin);
    this.ionViewDidLoad();

  }


  onClickSubmit(){
    
    if(this.timeIn === ''){
      this.timeIn = this.now.toTimeString().substring(0,8); 
      this.toastService.presentToast('เวลาเข้าทำงานคุณคือ '+ this.timeIn);
    }else if(this.timeIn !== '' && this.timeOut !== '')
    {
      this.toastService.presentToast('เวลาทำงานของคุณได้บันทึกทั้งเข้าและออกแล้ว');
    }else{
      this.timeOut = this.now.toTimeString().substring(0,8);
      this.toastService.presentToast('เวลาออกทำงานของคุณคือ '+ this.timeOut);
    }
      
    

    
    
  
    /*this.alertCrtl.create({
      header: 'บันทึกเวลาทำงาน',
      message: 'เวลา: '+ this.now.toLocaleString()+ '\nที่อยู่ปัจจุบัน: '+this.lat+','+this.lng,
      buttons: ['บันทึก']
    }).then(alert => {
      alert.present();
    });*/
  }

  viewProjectAssign(){
    this.projectService.getListProject()
    .subscribe( res => {
      this.projects = res;
      //console.log(this.projects);
    },
      err => console.log(err)
    )
  }

  viewProfile(user: any){
    this.userService.getProfile(user)
    .subscribe( res => {
      this.userProfile = res;
    },
      err => console.log(err)
    )
  }

  ionViewDidLoad(){
    this.geo.getCurrentPosition().then( pos => {
      this.lat = pos.coords.latitude;
      this.lng = pos.coords.longitude;
      console.log(this.lat,this.lng);
    }).catch( err => console.log(err));
  }

}
