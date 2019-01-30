import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {HomePage} from '../pages/home/home';
import {Geolocation} from "@ionic-native/geolocation";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage;
  lat:number;
  lng: number;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, geoLocation: Geolocation) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

/*      geoLocation.getCurrentPosition().then((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        alert("LAT" + this.lat);
        alert("LNG" + this.lng);
      }, error => alert(JSON.stringify(error)))*/
      statusBar.styleDefault();
      splashScreen.hide();


    });
  }

}

function onMapSuccess(position) {

  alert("lat" + position.coords.latitude);
  alert("lng" + position.coords.latitude);
}

function onError(error) {
  alert('code: ' + error.code + '\n' +
    'message: ' + error.message + '\n');
}
