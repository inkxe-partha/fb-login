
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';

import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider,
  LinkedinLoginProvider
} from 'angular5-social-auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,private socialAuthService: AuthService,private fb: Facebook) {
    

  }

  
  public socialSignIn(socialPlatform : string) {

    let permissions = new Array<string>();
    let nav = this.navCtrl;

    //the permissions your facebook app needs from the user
    permissions = ["public_profile"];

    this.fb.login(permissions)
    .then((response) => {
      let userId = response.authResponse.userID;
      let params = new Array<string>();

      //Getting name and gender properties
      this.fb.api("/me?fields=name,gender", params)
      .then((user) => {
        user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
        //now we have the users info, let's save it in the NativeStorage
      })
    }, (error) => {
      console.log(error);
    });
    // let socialPlatformProvider;
    // if(socialPlatform == "facebook"){
    //   socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    // }
    
    // this.socialAuthService.signIn(socialPlatformProvider).then(
    //   (userData) => {
    //     console.log(socialPlatform+" sign in data : " , userData);
    //     // Now sign-in with userData
       
    //   }
    // );
    this.fb.getLoginStatus()
    .then(res => {
      console.log(res.status);
      if(res.status === "connect") {
        
      } else {
        
      }
    })
    .catch(e => console.log(e));

    this.fb.login(['public_profile', 'user_friends', 'email'])
    .then(res => {
      if(res.status === "connected") {
        this.getUserDetail(res.authResponse.userID);
      } else {
      }
    })
    .catch(e => console.log('Error logging into Facebook', e));

  }
    
  getUserDetail(userid) {
    this.fb.api("/"+userid+"/?fields=id,email,name,picture,gender",["public_profile"])
      .then(res => {
        console.log(res);
        
      })
      .catch(e => {
        console.log(e);
      });
  }

}
