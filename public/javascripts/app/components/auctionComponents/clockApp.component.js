"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Created by Umar on 01/02/2017.
 */
var core_1 = require('angular2/core');
var metadata_1 = require("angular2/src/core/metadata");
var Rx_1 = require("rxjs/Rx");
var async_1 = require("angular2/src/facade/async");
var ClockAppComponent = (function () {
    function ClockAppComponent() {
        this.day = 86400000;
        this.hour = 3600000;
        this.minute = 60000;
        this.second = 1000;
        //interval = undefined;
        this.isActive = true;
        this.socket = null;
        this.timeUp = new async_1.EventEmitter();
    }
    ClockAppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.socket = io('http://localhost:8000');
        this.socket.on('timeRemaining-' + this.id, function (data) {
            this.time = data;
            console.log("Time is: " + data);
        }.bind(this));
        console.log(this.time);
        this.observer = Rx_1.Observable.interval(1000).map(function (x) {
            _this.timeRemaining = _this.onTick();
        }).subscribe(function (x) { });
    };
    ClockAppComponent.prototype.onTick = function () {
        if (this.isActive === false) {
            this.observer.unsubscribe();
            this.observer = null;
        }
        //console.log("ticking af");
        var output = "";
        var remainder = this.time;
        //this.timeLeft = remainder;
        if (this.time === 0 || this.time <= 0) {
            //this.stop();
            console.log('timeup');
            this.isActive = false;
            this.timeUp.emit('timeUp-' + this.id);
            return;
        }
        var numDays = Math.floor(remainder / this.day);
        remainder -= this.day * numDays;
        var numHours = Math.floor(remainder / this.hour);
        remainder -= this.hour * numHours;
        var numMinutes = Math.floor(remainder / this.minute);
        remainder -= this.minute * numMinutes;
        var numSeconds = Math.floor(remainder / this.second);
        output = ([numDays.toString(), numHours.toString(), numMinutes.toString(), numSeconds.toString()].map(function (str) {
            if (str.length === 1) {
                return "0" + str;
            }
            return str;
        }).join(":"));
        this.time -= this.second;
        //console.log("oooh : "+ output);
        return output;
    };
    __decorate([
        metadata_1.Input()
    ], ClockAppComponent.prototype, "id", void 0);
    __decorate([
        metadata_1.Output()
    ], ClockAppComponent.prototype, "timeUp", void 0);
    ClockAppComponent = __decorate([
        core_1.Component({
            selector: 'clock-app',
            templateUrl: '/templates/auctionTemplates/clock.html'
        })
    ], ClockAppComponent);
    return ClockAppComponent;
}());
exports.ClockAppComponent = ClockAppComponent;
/*http://stackoverflow.com/questions/36461089/time-countdown-in-angular-2*/ 
