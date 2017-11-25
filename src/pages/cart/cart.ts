import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MyHttpService} from '../../app/utility/service/myhttp.service'
import {LoginPage} from '../login/login'
import {IndexPage} from '../index/index'
import {OrderConfirmPage} from '../order-confirm/order-confirm'
/**
 * Generated class for the CartPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  //保存的是用户是否登录
  isUserLogin:boolean = false;
  //定义数组 用来保存购物车列表
  cartList:Array<any> = [];

  constructor(private myhttp:MyHttpService,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
  }

  ionViewWillEnter(){
    this.checkUserLogin();
  }

  //检查用户是否登录
  checkUserLogin(){
    this.myhttp
    .sendRequest("http://127.0.0.1/maseratiAPP/data/user/session_data.php")
    .subscribe((result:any)=>{
        if(result)
        {
          if(result.uid){
            //登录状态
            this.isUserLogin = true;
            this.getCartInfo();
          }
          else{
            //未登录
            this.isUserLogin = false;
          }
        }
    })
  }

  //跳转到登录页
  jumpToLogin(){
    this.navCtrl.push(LoginPage);
  }

  //跳转到首页 ?
  jumpToIndex(){
    //this.navCtrl.push(IndexPage);
    console.log("test-----",this.navCtrl.parent);
    this.navCtrl.parent.select(0);
  }

  //获取购物车数据
  getCartInfo(){
    this.myhttp
    .sendRequest('http://127.0.0.1/maseratiAPP/data/cart/list.php')
    .subscribe((result:any)=>{
      console.log(result);
      //保存服务器返回的购物车列表数据
      this.cartList = result.data;
    })
  }

  //从购物车中去删除某一个产品
  deleteFromCart(index){
     this.myhttp
    .sendRequest('http://127.0.0.1/maseratiAPP/data/cart/del.php?iid='+this.cartList[index].iid)
    .subscribe((result:any)=>{
      console.log(result);
      //保存服务器返回的购物车列表数据
      if(result.code == 200)
      {
        //删除成功，从cartList中清除改数据
        this.cartList.splice(index,1);
      }
      else{
        //删除失败
        this.myhttp.showToast('删除失败');
      }
      
    })
  }

  //计算总价格
  getTotalPrice(){
    let totalPrice = 0;

    for(var i=0;i<this.cartList.length;i++){
      totalPrice+=
      (this.cartList[i].count*this.cartList[i].price);
    }

    return  totalPrice;
  }

  //修改购物车中指定产品的数量
  modifyCount(isMinus:boolean,index:number){
    let previousCount = this.cartList[index].count;
    if(isMinus){
        if(previousCount == 1){
            return
        }
        else{
          previousCount--;
        }
    }
    else{
      previousCount++;
    }
    //将修改后的值 保存
    this.cartList[index].count = previousCount;
  }

  //跳转到订单支付页面
  jumpToOrderConfirm(){
    this.navCtrl.push(OrderConfirmPage);
  }


}
