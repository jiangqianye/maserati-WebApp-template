import { Component } from '@angular/core';
import { IonicPage,ToastController, NavController, NavParams } from 'ionic-angular';
import {MyHttpService} from '../../app/utility/service/myhttp.service';
/**
 * Generated class for the UserCenterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-user-center',
  templateUrl: 'user-center.html',
})
export class UserCenterPage {

  constructor(public toastCtrl:ToastController,public myHttp:MyHttpService,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserCenterPage');
  }

  logout(){
    //完成与服务器端的通信，退出登录
    this.myHttp
    .sendRequest("http://127.0.0.1/maseratiAPP/data/user/logout.php")
    .subscribe((result)=>{
      console.log(result);
      if(result.code == 200){
        //通过toast提示 退出登录成功
        this.toastCtrl.create({
          message:'退出登录成功',
          duration:500
        }).present();
      }
    })

  }

}
