import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {IndexPage} from '../index/index'
import {CartPage} from '../cart/cart'
import {UserCenterPage} from '../user-center/user-center'
import {NotFoundPage} from '../not-found/not-found'

/**
 * Generated class for the HomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  indexPage;
  cartPage;
  userCenterPage;
  notFoundPage


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.indexPage = IndexPage;
    this.cartPage = CartPage;
    this.userCenterPage = UserCenterPage;
    this.notFoundPage = NotFoundPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

}
