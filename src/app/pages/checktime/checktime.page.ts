import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'app/services/user.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ProjectService } from 'app/services/project.service';
import { AlertController } from '@ionic/angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastService } from 'app/services/toast.service';
import { ChecktimeService } from 'app/services/checktime.service';
import { TimeAttendance } from 'app/models/TimeAttendance';

@Component({
  selector: 'app-checktime',
  templateUrl: './checktime.page.html',
  styleUrls: ['./checktime.page.scss'],
})
export class ChecktimePage implements OnInit {

  projects: any = [];
  listTime: any = [];
  timeById: any = [];
  userProfile: any = [];
  projInLoation: any = [];
  sumInLocation: any = [];

  timeAttendace: TimeAttendance;



  userLogin = this.route.snapshot.paramMap.get("userLogin");
 

  checkInForm: FormGroup;

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
    checkOut: '',
    ProjId: ''
  }

  
  constructor(
    private userService: UserService,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private geo: Geolocation,
    private alertCrtl: AlertController,
    private toastService: ToastService,
    private checkTime: ChecktimeService,
    private fb: FormBuilder
    ) 
    { 
        this.timeToday = Date.now().toString();
        setInterval(() => {
          this.now = new Date();
        }, 1);

        
    }

  ngOnInit() {
    
    this.checkInForm = this.fb.group({
      ProjId: [''],
      empId: [''],
      timeIn: [''],
      timeOut: ['']
    })
    
    //console.log('load');
    this.viewProjectAssign();
    this.viewProfile(this.userLogin);
    this.ionViewDidLoad();
    this.checkLocationInProject();

  }


  onClickSubmit(){
    console.log(JSON.stringify(this.checkInForm.value,null,4));
    console.log(this.checkInForm.get('empId').value)

      this.alertCrtl.create({
        header: 'คุณอยู่นอกพื้นที่โครงการ',
        message: 'ต้องการบันทึกเวลาใช่หรือไม่',
        buttons: [
          {
            text: 'ยกเลิก',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'ยืนยัน',
            handler: () => {
              this.toastService.presentToast('เวลา: '+ this.now.toTimeString().substring(0,8)+ '\nที่อยู่ปัจจุบัน: '+this.lat+','+this.lng);
              const currentTime = this.now.toTimeString().substring(0,8); 
              console.log('currentTime: '+ currentTime);
            }
          }
        ]
      }).then(alert => {
      alert.present();
    });
    

    // if(this.timeIn === ''){
    //   this.timeIn = this.now.toTimeString().substring(0,8); 
    //   this.toastService.presentToast('เวลาเข้าทำงานคุณคือ '+ this.timeIn);
    // }else if(this.timeIn !== '' && this.timeOut !== '')
    // {
    //   this.toastService.presentToast('เวลาทำงานของคุณได้บันทึกทั้งเข้าและออกแล้วi');
    // }else{
    //   this.timeOut = this.now.toTimeString().substring(0,8);
    //   this.toastService.presentToast('เวลาออกทำงานของคุณคือ '+ this.timeOut);
    // }

    
    //   this.checkTime.saveTMA(this.checkInForm.value)
    //   .subscribe( data => {
    //     this.timeAttendace = this.checkInForm.value;
    //   },
    //     err => console.log(err)
    //   )

  }

  // addTimeAttendance(){

  //   this.checkTime.getTMAByEmpId(this.userLogin)
  //   .subscribe( data => {
  //     this.timeById = data;
  //     const result = this.timeById.length;
  //     console.log(result);
  //     if(result >= 1){

  //     }else{
  //       this.checkTime.saveTMA(this.checkInForm.value)
  //       .subscribe( data => {
  //         this.timeAttendace = this.checkInForm.value;
  //       },
  //         err => console.log(err)
  //       )
  //     }
  //   },
  //     err => console.log(err)
  //   )

    
  // }

  viewProjectAssign(){
    this.projectService.getListProject()
    .subscribe( res => {
      this.projects = res;
      //console.log(this.projects);
    },
      err => console.log(err)
    )
  }

  checkLocationInProject(){
    this.geo.getCurrentPosition().then( pos => {
      this.lat = pos.coords.latitude;
      this.lng = pos.coords.longitude;
      let latAdd = this.lat + 0.005;
      let latDiff = this.lat - 0.005;
      // let logAdd = this.lng + 0.001;
      // let logDiff = this.lng - 0.001;
      this.projectService.getProjectInLoaction(latDiff,latAdd)
      .subscribe( res => {
        console.log('-----------------Project In Location --------------');
        this.projInLoation = res;
        console.log(this.projInLoation.length);
        if(this.projInLoation.length !== 0){
          this.projInLoation = res;
        }else{
          this.toastService.presentToast('คุณอยู่นอกพื้นที่โครงการที่กำหนด');
        }
        
      },
      err => console.log(err)
      )
      
    }).catch( err => console.log(err));
    
    
    
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
      //console.log(this.lat,this.lng);
    }).catch( err => console.log(err));

    
  }

  viewListTMA(){
    this.checkTime.getListTMA()
    .subscribe( data => {
      this.listTime = data;
    },
      err => console.log(err)
    )
  }

  

}
