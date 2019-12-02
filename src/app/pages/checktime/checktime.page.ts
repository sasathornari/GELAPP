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
  currentToday = this.now.toISOString().substring(0, 10) + ' ' + this.now.toTimeString().substring(0, 8);
  currentDate = this.now.toISOString().substring(0, 10);
  currentTime = this.now.toTimeString().substring(0, 8);

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
  ) {
    this.timeToday = Date.now().toString();
    setInterval(() => {
      this.now = new Date();
    }, 1);
  }

  ngOnInit() {
    this.userlogin = localStorage.getItem('token');

    this.checkInForm = this.fb.group({
      ProjId: [''],
      empId: [this.userlogin],
      dateIn: [''],
      time_in: [''],
      dateOut: [''],
      time_out: [''],
      latitude: [''],
      longtitude: [''],
      description: [''],
      images: [''],
      userCreated: [''],
      dateCreated: [''],
      userUpdated: [''],
      dateUpdated: ['']
    })

    //console.log('this.userlogin -->',this.userlogin);
    this.ionViewDidLoad();
    this.checkLocationInProject();
    this.findListTMA();

    this.userService.getProfile(this.userlogin)
      .subscribe(res => {
        this.userProfile = res;
      },
        err => console.log(err)
      )

  }


  onClickSubmit() {
    console.log(JSON.stringify(this.checkInForm.value, null, 4));
    //check timeattendance on today
    this.checkTime.getCurrentTMAByEmId(this.userlogin, this.projInLoation[0].ProjId, this.now.toISOString().substring(0, 10))
      .subscribe(res => {
        console.log('TMA on today -->> ', res.length);

        // Save new time attendance to database.
        if (res.length === 0) {
          this.alertCrtl.create({
            header: 'บันทึกเวลาการทำงาน',
            message: 'คุณต้องการบันทึกเวลาใช่หรือไม่',
            buttons: [
              {
                text: 'ยกเลิก',
                role: 'cancel',
                handler: () => {
                  this.toastService.presentToast('คุณไม่ได้บันทึกเวลาทำงาน');
                }
              },
              {
                text: 'ยืนยัน',
                handler: () => {
                  this.checkInForm.controls['dateIn'].setValue(this.now.toISOString().substring(0, 10));
                  this.checkInForm.controls['time_in'].setValue(this.now.toTimeString().substring(0, 8));                  
                  this.checkInForm.controls['ProjId'].setValue(this.projInLoation[0].ProjId);
                  this.checkInForm.controls['latitude'].setValue(this.lat);
                  this.checkInForm.controls['longtitude'].setValue(this.lng);
                  this.checkInForm.controls['userCreated'].setValue(this.userlogin);
                  this.checkInForm.controls['dateCreated'].setValue(this.currentToday);
                  // Save new transaction time attendance to database on today.
                  this.saveTimeAttendance();
                  this.timeIn = this.now.toTimeString().substring(0, 8);
                  this.toastService.presentToast('บันทึกเวลา: ' + this.timeIn + ' เรียบร้อยแล้ว');
                }
              }
            ]
          }).then(alert => {
            alert.present();
          });

        } else {
          console.log(res[0].time_in)
          this.checkInForm.controls['dateOut'].setValue(this.now.toISOString().substring(0, 10));
          this.checkInForm.controls['time_out'].setValue(this.now.toTimeString().substring(0, 8));
          this.checkInForm.controls['userUpdated'].setValue(this.userlogin);
          this.checkInForm.controls['dateUpdated'].setValue(this.currentToday);
          this.updateTimeAttendance();
          this.toastService.presentToast('คุณบันทึกเวลาทำงานเรียบร้อยแล้ว');
        //  if (res[0].time_out === '' || res[0].time_out === null || res[0].time_out ==='00:00:00') {
            
        //     this.alertCrtl.create({
        //       header: 'บันทึกเวลาการทำงาน',
        //       message: 'คุณต้องการบันทึกเวลาออกใช่หรือไม่',
        //       buttons: [
        //         {
        //           text: 'ยกเลิก',
        //           role: 'cancel',
        //           handler: () => {
        //             this.toastService.presentToast('คุณไม่ได้บันทึกเวลาทำงาน');
        //           }
        //         },
        //         {
        //           text: 'บันทึก',
        //           handler: () => {
        //             this.checkInForm.controls['dateOut'].setValue(this.now.toISOString().substring(0, 10));
        //             this.checkInForm.controls['time_out'].setValue(this.now.toTimeString().substring(0, 8));
        //             this.checkInForm.controls['ProjId'].setValue(this.projInLoation[0].ProjId);
        //             this.updateTimeAttendance();
        //             this.toastService.presentToast('คุณบันทึกเวลาทำงานเรียบร้อยแล้ว');
        //           }
        //         }
        //       ]
        //     });
        //   }
        }
      },
        err => {
          this.toastService.presentToast(err);
          console.log(err);
        });


  }

  findTMAofUser(user: any) {

    this.checkTime.getTMAByEmpId(user)
      .subscribe(data => {
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

  checkLocationInProject() {
    this.geo.getCurrentPosition().then(pos => {
      this.lat = pos.coords.latitude;
      this.lng = pos.coords.longitude;
      let latAdd = this.lat + 0.005;
      let latDiff = this.lat - 0.005;
      let lngAdd = this.lng + 0.005;
      let lngDiff = this.lng - 0.005;
      this.projectService.getProjectInLoaction(latDiff, latAdd, lngDiff, lngAdd)
        .subscribe(res => {
          console.log('-----------------Project In Location --------------');
          this.projInLoation = res;
          console.log(this.projInLoation.length);


          // Project near current location 
          if (this.projInLoation.length !== 0) {
            this.projInLoation = res;
            console.log(this.projInLoation[0].ProjId);
            return this.projInLoation[0].ProjId;
            // Location not near project
          } else {
            this.toastService.presentToast('คุณอยู่นอกพื้นที่โครงการที่กำหนด');
          }

        },
          err => console.log(err)
        )

    }).catch(err => console.log(err));



  }

  ionViewDidLoad() {
    this.geo.getCurrentPosition().then(pos => {
      this.lat = pos.coords.latitude;
      this.lng = pos.coords.longitude;
      //console.log(this.lat,this.lng);
    }).catch(err => console.log(err));


  }

  findListTMA() {
    this.checkTime.getTMAByEmpId(this.userlogin)
      .subscribe(data => {
        this.listTime = data;
        console.log('transaction time -->> ', this.listTime);
        if (this.listTime.length !== 0) {
          this.timeIn = this.listTime[0].time_in;
          this.timeOut = this.listTime[0].time_out;
        }
      },
        err => console.log(err)
      )
  }


  saveTimeAttendance() {
    this.checkTime.saveTMA(this.checkInForm.value)
      .subscribe(data => {
        this.timeAttendance = this.checkInForm.value;
        console.log('this.timattendance: ' + JSON.stringify(this.timeAttendance, null, 6));
        console.log('Data: ' + data);
        this.toastService.presentToast('บันทึกแล้ว');
      },
        err => console.log(err)
      );
  }

  updateTimeAttendance() {
    this.checkTime.updateTMA(this.userlogin, this.checkInForm.value)
      .subscribe(res => {
        this.timeAttendance = this.checkInForm.value;
        console.log('this.timattendance: ' + JSON.stringify(this.timeAttendance, null, 6));
        this.toastService.presentToast('บันทึกเปลี่ยนแปลงเรียบร้อย');

      },
        err => {
          this.toastService.presentToast(err);
          console.log(err)
        }
      );
  }

}
