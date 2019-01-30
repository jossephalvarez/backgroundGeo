import {Injectable, NgZone} from '@angular/core';
import {BackgroundGeolocation, BackgroundGeolocationConfig} from '@ionic-native/background-geolocation';
import {Geolocation, Geoposition} from '@ionic-native/geolocation';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

@Injectable()
export class LocationTrackerProvider {

  public watch: any;
  public lat: number = 0;
  public lng: number = 0;
  public locations: location[] = [];
  public locations2: location[] = [];


  constructor(public zone: NgZone,
              public backgroundGeolocation: BackgroundGeolocation,
              public geolocation: Geolocation) {

  }

  public startTracking() {

    let config: BackgroundGeolocationConfig = {
      desiredAccuracy: 0,
      stationaryRadius: 20,
      distanceFilter: 10,
      debug: true,
      interval: 10000
    };

    this.backgroundGeolocation.configure(config).subscribe((location) => {

      console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);


      // Update inside of Angular's zone
      this.zone.run(() => {
        this.lat = location.latitude;
        this.lng = location.longitude;
        console.log("ZONE 1");
        let newLocation: location = {
          lat: location.latitude,
          lng: location.longitude
        };
        this.locations.push(newLocation);
      });
    }, (err) => {
      console.log(err);
    });

    this.backgroundGeolocation.start();

    // Background tracking
    let options = {
      frequency: 6000,
      enableHighAccuracy: true
    };

    this.watch = this.geolocation.watchPosition(options).filter((p: any) => p.code === undefined).subscribe((position: Geoposition) => {
      console.log(position);

      let newLocation: location = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      this.locations2.push(newLocation);

      this.zone.run(() => {
        alert("ZONE 2");
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });
    });
  }

  public stopTracking() {
    console.log('stopTracking');
    alert("STOP TRACKING");
    alert(this.locations.length);
    alert(this.locations);
    alert("STOP TRACKING2");
    alert(this.locations2.length);
    alert(this.locations2);
    this.backgroundGeolocation.finish();
    this.watch.unsubscribe();

  }
}
