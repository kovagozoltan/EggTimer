import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable ({ providedIn: 'root' })

export class LocationService {

  constructor(private HTTP: HttpClient) {}

  getLocation(data){
    return this.HTTP.post('http://eggtimer-env.eba-tmsnznjj.eu-west-3.elasticbeanstalk.com/location', data)
  }

  getElevation(data){
    return this.HTTP.post('http://eggtimer-env.eba-tmsnznjj.eu-west-3.elasticbeanstalk.com/elevation', data)
  }
}
