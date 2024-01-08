// timer.component.ts
import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit, OnDestroy {
  @Output() timerUpdated: EventEmitter<string> = new EventEmitter<string>();

  timer: string = '05:00';
  timerSubscription: Subscription | undefined;
  isPaused: boolean = false;
  

  ngOnInit() {
  }

  startTimer() {
   
    this.timerSubscription = interval(1000).subscribe(() => {
      const minutes = Math.floor(Number(this.timer.split(':')[0]));
      const seconds = Math.floor(Number(this.timer.split(':')[1]));

      if (minutes === 0 && seconds === 0) {
        this.stopTimer();
      } else {
        const newMinutes = ((minutes * 60 + seconds - 1) / 60).toFixed(2);
        const newSeconds = ((minutes * 60 + seconds - 1) % 60).toFixed(2);
        this.timer = `${this.formatTime(Number(newMinutes))}:${this.formatTime(Number(newSeconds))}`;
        this.timerUpdated.emit(this.timer); // Emit updated timer value
      }
    });
  }

  stopTimer() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  pauseTimer() {
    this.stopTimer();
    this.isPaused = true;
  }

  resumeTimer() {
    this.isPaused = false;
    this.startTimer();
  }

  resetTimer() {
    this.stopTimer();
    this.isPaused = false;
    this.timer = '05:00';
    this.timerUpdated.emit(this.timer); // Emit reset timer value
  }

  formatTime(time: number): string {
    return time < 10 ? `0${time}` : `${time}`;
  }

  ngOnDestroy() {
    this.stopTimer();
  }
}
