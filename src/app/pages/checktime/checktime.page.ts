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

  timeAttendance: TimeAttendance;

  checkInForm: FormGroup;

  lat: any;
  lng: any;

  userlogin: string;
  timeToday: string;
  now: Date = new Date();
  date: Date = new Date(); 
  currentToday = this.now.toISOString().substring(0,10) + ' ' + this.now.toTimeString().substring(0,8);
  currentDate = this.now.toISOString().substring(0,10);
  currentTime = this.now.toTimeString().substring(0,8);

  timeIn = '';
  timeOut = '';

  cntInDate = '';
  cntOutDate = '';
  cntInTime = '';
  cntOutTime = '';

   
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
    this.userlogin =  localStorage.getItem('token');

    this.checkInForm = this.fb.group({
      ProjId: [''],
      empId: [this.userlogin],
      dateIn: [this.cntInDate],
      timeIn: [this.cntInTime],
      dateOut: [this.cntOutDate],
      timeOut: [this.cntOutTime],
      description: ['test'],
      images: ['ทดสอบ'],  
      userCreated: [this.userlogin],
      dateCreated: [this.currentToday]
    })
    
    console.log('this.userlogin -->',this.userlogin);
    this.ionViewDidLoad();
    this.checkLocationInProject();

    this.userService.getProfile(this.userlogin)
    .subscribe( res => {
      this.userProfile = res;
    },
      err => console.log(err)
    )

  }


  onClickSubmit(){
    console.log(JSON.stringify(this.checkInForm.value,null,4));

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
              // this.toastService.presentToast('เวลา: '+ this.now.toTimeString().substring(0,8)+ '\nที่อยู่ปัจจุบัน: '+this.lat+','+this.lng);
              // const currentTime = this.now.toTimeString().substring(0,8); 
              // console.log('currentTime: '+ currentTime);

              // check timeattendance on today
              this.projectService.getTMAOnToday(this.userlogin)
              .subscribe( res => {
                console.log('TMA on today -->> ',res.length);
                if(res.length === 0){
                  this.checkInForm.controls['dateIn'].setValue(this.now.toISOString().substring(0,10));
                  this.checkInForm.controls['timeIn'].setValue(this.now.toTimeString().substring(0,8));
                  this.checkInForm.controls['ProjId'].setValue(this.projInLoation[0].ProjId);
                  // Save new transaction time attendance to database on today.
                  this.saveTimeAttendance();
                  this.timeIn = this.now.toTimeString().substring(0,8);
                }else{
                  this.timeIn = res[0].time_in;
                  console.log('Time In of database : ',this.timeIn)
                }
              })
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

  findTMAofUser(user: any){

    this.checkTime.getTMAByEmpId(user)
    .subscribe( data => {
      this.timeById = data;
      //const result = data.length;
      console.log(this.timeById.length);
      // if(data.length >= 1){
      //   console.log(this.timeById);
      //   return this.timeById;
      // }else{
      //   return {message: 'ไม่พบข้อมูล'}
      // }
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
      let lngAdd = this.lng + 0.005;
      let lngDiff = this.lng - 0.005;
      this.projectService.getProjectInLoaction(latDiff,latAdd,lngDiff,lngAdd)
      .subscribe( res => {
        console.log('-----------------Project In Location --------------');
        this.projInLoation = res;
        console.log(this.projInLoation.length);
        

        // Project near current location 
        if(this.projInLoation.length !== 0){
          this.projInLoation = res;
          console.log(this.projInLoation[0].ProjId);
          return this.projInLoation[0].ProjId;
        // Location not near project
        }else{
          this.toastService.presentToast('คุณอยู่นอกพื้นที่โครงการที่กำหนด');
        }
        
      },
      err => console.log(err)
      )
      
    }).catch( err => console.log(err));
    
    
    
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


  saveTimeAttendance(){
    this.projectService.saveTimeIn(this.checkInForm.value)
    .subscribe( data => {        
      this.timeAttendance = this.checkInForm.value;
      console.log('this.timattendance: '+JSON.stringify(this.timeAttendance, null, 6));
      console.log('Data: '+data);
      this.toastService.presentToast('บันทึกแล้ว');
    },
    err => console.log(err)
    );
  }
  
}
