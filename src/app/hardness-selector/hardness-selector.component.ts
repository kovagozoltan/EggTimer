import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { LocationService } from '../services/location.service'
import { slideUp, fallDown, fadeButtons, showInput, fadeEgg, slideUpLocations, slideDownNotification } from './animations'

@Component({
  selector: 'app-hardness-selector',
  templateUrl: './hardness-selector.component.html',
  styleUrls: ['./hardness-selector.component.css'],
  animations: [slideUp, fallDown, fadeButtons,
    showInput, fadeEgg, slideUpLocations, slideDownNotification]
})
export class HardnessSelectorComponent implements OnInit {

  // animation variables
  eggFall;
  inputShow = 'hidden';
  animateShow = 'hidden';
  eggShow = 'show';
  showLocations = 'hidden';
  slideDownNotification = 'hidden';

  eggFinishingTemp;
  location = {location: ''};
  locationsRecieved;
  locationResults;
  dataToSend = [];

  rollingTimer = false; // is there a timer already running
  currentTime; // current time on ngOnInit
  distance; // how much time to count - start time - end time
  startTime; // timer start time
  deadline; // timer end time
  min; // timer minutes
  sec; // timer seconds

  constructor( private ROUTER: Router, private DATASERVICE: DataService, private LOCATIONSERVICE: LocationService) { }

  ngOnInit() {
    this.distance = parseInt(localStorage.getItem('distance'));
    this.startTime = parseInt(localStorage.getItem('startTime'));
    if(this.distance && this.startTime){
      this.deadline = this.startTime + this.distance;
      this.currentTime = new Date().getTime();
      if (this.currentTime < this.deadline){
        this.rollingTimer = true;

        let timeElapsed = this.deadline - this.currentTime;
        this.distance = this.distance - timeElapsed;
        if (this.distance > 0) {
          this.continueTimer()
        }
      } else {
        localStorage.removeItem("distance");
        localStorage.removeItem("startTime");
        this.rollingTimer = false;
      }
    }
  }

  // ANIMATIONS
  slideUpDone() {
    this.animateShow = 'show';
    this.eggFall = 'up';
  }
  proceedToLocation() {
    if (this.eggFinishingTemp == null){
      return;
    }
    this.animateShow = 'hidden';
  }
  fadeButtonsDone() {
    if (this.animateShow === 'hidden' && this.eggFall === 'up') {
      this.eggFall = 'down';
    }
  }
  showSearchInput() {
    if (this.eggFall === 'down') {
      this.inputShow = 'show';
    }
  }
  proceedToMain() {
    if (this.showLocations === 'hidden') {
      this.inputShow = 'hidden';
      this.eggShow = 'hidden';
    }
  }
  skipLocation(){
    this.dataToSend.push({elevation: 0});
    this.proceedToMain();
  }
  showMain() {
    if (this.eggShow === 'hidden') {
      this.dataToSend.push({temp: this.eggFinishingTemp})
      this.sendData(this.dataToSend);
      this.ROUTER.navigate(['/details']);
    }
  }
  hideLocations() {
    this.proceedToMain()
  }


  sendData(data){
    this.DATASERVICE.changeMessage(data);
  }

  searchLocation() {
    if(this.location.location.length){
      this.LOCATIONSERVICE.getLocation(this.location).subscribe( (data: any) => {
        this.locationResults = data.results;
        this.locationsRecieved = true;
        if(this.locationsRecieved){
          this.showLocations = 'show';
        }
      })
    }
  }

  getElevations(geometry){
    this.LOCATIONSERVICE.getElevation(geometry).subscribe( (data: any) => {
      this.dataToSend.push({elevation: data.elevations[0].elevation})
      this.showLocations = 'hidden';
      // this.proceedToMain()
    })
  }

  continueTimer() {
     let count = setInterval( () => {
      this.distance = this.deadline - this.currentTime;
      this.min = (Math.floor((this.distance % (1000 * 60 * 60)) / (1000 * 60))).toString().padStart(2, '0');
      this.sec = (Math.floor((this.distance % (1000 * 60)) / 1000)).toString().padStart(2, '0');
      if (this.distance <= 0 ){
        clearInterval(count);
        this.playAlertSound()
      }
      this.slideDownNotification = 'show';
      this.currentTime = this.currentTime + 1000;
    }, 1000);
  }

  playAlertSound(){
    let alarm = new Audio();
    alarm.src = "../../assets/images/eggAlarm.wav";
    alarm.load();
    alarm.play()
  }

  gotoTimer(){
    this.dataToSend.push({timer: true, deadline: this.deadline})
    this.sendData(this.dataToSend);
    this.ROUTER.navigate(['/details']);
  }

  dismissNotification() {
    localStorage.removeItem("distance");
    localStorage.removeItem("startTime");
    this.slideDownNotification = 'hidden';
    this.rollingTimer = false;
  }

}

