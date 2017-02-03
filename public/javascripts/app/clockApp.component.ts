/**
 * Created by Umar on 01/02/2017.
 */
import {Component} from 'angular2/core';
import {Input, Output} from "angular2/src/core/metadata";
import {Observable} from "rxjs/Rx";
import {EventEmitter} from "angular2/src/facade/async";

@Component({
    selector: 'clock-app',
    templateUrl: '/templates/clock.html'
})

export class ClockAppComponent {

    @Input() id;
    timeRemaining : string;
    day = 86400000;
    hour = 3600000;
    minute = 60000;
    second = 1000;
    time;
    //interval = undefined;
    isActive = true;
    socket = null;
    @Output() timeUp: EventEmitter<string> = new EventEmitter<string>();
    observer;

    ngOnInit() {
        this.socket = io('http://localhost:8000');

        this.socket.on('timeRemaining-' + this.id, function(data){
            this.time = data;
            console.log("Time is: " + data);
        }.bind(this));

        console.log(this.time);

        this.observer = Observable.interval(1000).map((x) => {
            this.timeRemaining = this.onTick();
        }).subscribe((x) => {});
    }

    onTick(){

        if(this.isActive === false){
            this.observer.unsubscribe();
            this.observer = null;
        }

        //console.log("ticking af");
        let output = "";
        let remainder = this.time;
        //this.timeLeft = remainder;

        if (this.time === 0 || this.time <= 0) {
            //this.stop();
            console.log('timeup');
            this.isActive = false;
            this.timeUp.emit('timeUp-' + this.id);
            return;
        }

        let numDays = Math.floor(remainder / this.day);
        remainder -= this.day * numDays;

        let numHours = Math.floor(remainder / this.hour);
        remainder -= this.hour * numHours;

        let numMinutes = Math.floor(remainder / this.minute);
        remainder -= this.minute * numMinutes;

        let numSeconds = Math.floor(remainder / this.second);

        output =([numDays.toString(), numHours.toString(), numMinutes.toString(), numSeconds.toString()].map(function(str) {
            if (str.length === 1) {
                return "0" + str;
            }
            return str;
        }).join(":")
    );
        this.time -= this.second;
        //console.log("oooh : "+ output);
        return output;
    }


}

