import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  eggStartingTemp;
  eggSize;
  waterBoilingTemp = 100;
  eggFinishingTemp;
  eggElevation;
  cookingTime;

  min = "00";
  sec = "00";
  currentTime;
  deadline;

  timer;
  timerStarted;

  eggStartingTempNumerical = {
    room: 20,
    fridge: 4
  }
  eggSizeNumerical = {
    small: 50,
    medium: 55,
    large: 65
  };
  eggFinishingTempNumerical = {
    soft: 66,
    medium: 70,
    hard: 85
  };

  constructor(private ROUTER: Router, private DATASERVICE: DataService) { }

  ngOnInit() {
    this.DATASERVICE.currentMessage.subscribe((data: any) => {
      if(data.length != null){
        if (data[0].timer != null) {
          this.timer = 'true'
          this.deadline = data[0].deadline;
          this.currentTime = new Date().getTime();
          this.startTimer()
        } else {
          if (data[1].temp) {
            this.eggFinishingTemp = data[1].temp;
          }
          if (data[0].elevation) {
            this.eggElevation = data[0].elevation;
            this.waterBoilingTemp = 100 - (0.003390201224846894 * this.eggElevation)
          }
        }
      } else {
        this.ROUTER.navigate(['/']);
      }

    });

  }

  calculateTime() {
    if (this.eggStartingTemp && this.eggSize && this.eggFinishingTemp) {
      this.cookingTime = 0.451 * Math.cbrt(this.eggSizeNumerical[this.eggSize] * this.eggSizeNumerical[this.eggSize]) * Math.log(0.76 * ((this.eggStartingTempNumerical[this.eggStartingTemp] - this.waterBoilingTemp) / (this.eggFinishingTempNumerical[this.eggFinishingTemp] - this.waterBoilingTemp)))
      const minutes = this.cookingTime.toString().split('.')[0];
      const seconds = (this.cookingTime.toString().split('.')[1] / 100 * 60).toString().slice(0, 2);
      this.currentTime = new Date().getTime();
      this.deadline = new Date().setTime(new Date().getTime() + ((parseInt(minutes) * 60 + parseInt(seconds)) * 1000));
      let distance = this.deadline - this.currentTime;
      this.min = (Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).toString().padStart(2, '0');
      this.sec = (Math.floor((distance % (1000 * 60)) / 1000)).toString().padStart(2, '0');
    }
  }

  showMainTimer() {
    if (this.eggStartingTemp && this.eggSize && this.eggFinishingTemp) {
      this.timer = 'true';
    }
  }

  startTimer() {
    this.timerStarted = true;
    let distance = this.deadline - this.currentTime;
    let startTime = new Date().getTime();
    localStorage.setItem('distance', distance.toString());
    localStorage.setItem('startTime', startTime.toString());
    let count = setInterval(() => {
      let distance = this.deadline - this.currentTime;
      this.min = (Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).toString().padStart(2, '0');;
      this.sec = (Math.floor((distance % (1000 * 60)) / 1000)).toString().padStart(2, '0');;
      if (distance <= 0) {
        clearInterval(count);
        this.playAlertSound()
      }
      this.currentTime = this.currentTime + 1000;
    }, 1000);
  }

  resetTimer() {
    this.ROUTER.navigate(['/'])
  }

  playAlertSound() {
    let alarm = new Audio();
    alarm.src = "../../assets/images/eggAlarm.wav";
    alarm.load();
    alarm.play()
  }

}
