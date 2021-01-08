import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable ({ providedIn: 'root' })

export class LocationService {

  constructor(private HTTP: HttpClient) {}

  getLocation(data){
    return this.HTTP.post('https://egg-timer-kz.herokuapp.com/location', data)
  }

  getElevation(data){
    return this.HTTP.post('https://egg-timer-kz.herokuapp.com/elevation', data)
  }
}
