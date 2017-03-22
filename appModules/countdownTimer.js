/**
 * This is a factory which takes the form of a countdown timer.
 * This timer is used as a server-side clock for auctions and can
 * be used by any auction or any other part of the system that requires
 * it. It is an Observable and EventEmitter.
 */

var util = require('util');
var EventEmitter = require('events').EventEmitter;
var _  = require('underscore');

/***
 *
 * @param length
 * @returns {CountdownTimer}
 * @constructor
 */
function CountdownTimer(length) {
    if(false === (this instanceof CountdownTimer)) {
        return new CountdownTimer();
    }

    this.day = 86400000;
    this.second = 1000;
    this.time = this.day * length;
    this.interval = undefined;
    this.isActive = true;
    this.stopCount = 0;

    EventEmitter.call(this);

    _.bindAll(this, 'start', 'stop', 'onTick');
}

/**
 * Sets the object to type EventEmitter
 */
util.inherits(CountdownTimer, EventEmitter);

/**
 * Tick function which increments 1 count on the clock
 */
CountdownTimer.prototype.onTick = function() {

    if (this.time === 0 || this.time <= 0) {
        this.stop();
        this.isActive = false;
        return ;
    }

    this.emit('tick');
    this.time -= this.second;
};

/**
 * Starts the clock ticking
 */
CountdownTimer.prototype.start = function() {
  this.interval = setInterval(this.onTick, this.second);
  this.emit('start');
};

/**
 * Stops the clock ticking
 */
CountdownTimer.prototype.stop = function() {
    this.stopCount++;

    if (this.interval) {
        clearInterval(this.interval);
            console.log(this.stopCount);
            this.emit('stop');
        }

};

module.exports = CountdownTimer;