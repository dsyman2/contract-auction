/**
 * Created by Umar on 01/02/2017.
 */
import {Component} from 'angular2/core';
import {Input, Output} from "angular2/src/core/metadata";
import {Observable} from "rxjs/Rx";
import {EventEmitter} from "angular2/src/facade/async";
import globals = require('../../config/configer.js');

@Component({
    selector: 'clock-app',
    templateUrl: '/templates/auctionTemplates/clock.html'
})

/**
 * The clock app is present in all auctionApps, it's an angular app
 * which does the front end countdown clock.
 */
export class ClockAppComponent {

    @Input() id;
    timeRemaining : string;
    day = 86400000;
    hour = 3600000;
    minute = 60000;
    second = 1000;
    time;
    isActive = true;
    socket = null;
    @Output() timeUp: EventEmitter<string> = new EventEmitter<string>();
    observer;

    /**
     * On initialising do... instead of constructor so data can be passed in
     */
    ngOnInit() {
        this.socket = io(globals.socket_src)

        this.socket.on('timeRemaining-' + this.id, function(data){
            this.time = data;
            console.log("Time is: " + data);
        }.bind(this));

        this.observer = Observable.interval(1000).map((x) => {
            this.timeRemaining = this.onTick();
        }).subscribe((x) => {});
    }

    /**
     * Does all on tick tasks such as updating time and checking if the
     * clock is over.
     * @returns {string}
     */
    onTick(){

        if(this.isActive === false){
            this.observer.unsubscribe();
            this.observer = null;
        }

        let output = "";
        let remainder = this.time;

        if (this.time === 0 || this.time <= 0) {
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
        return output;
    }


}

/*http://stackoverflow.com/questions/36461089/time-countdown-in-angular-2*/