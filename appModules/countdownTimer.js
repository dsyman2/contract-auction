var util = require('util');
var EventEmitter = require('events').EventEmitter;
var _  = require('underscore');

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

util.inherits(CountdownTimer, EventEmitter);


CountdownTimer.prototype.onTick = function() {
    //var remainder = this.time;
    //this.timeLeft = remainder;

    if (this.time === 0 || this.time <= 0) {
        this.stop();
        this.isActive = false;
        //this.emit('stop');
        return ;
    }

    this.emit('tick'/*, output*/);
    this.time -= this.second;
};

CountdownTimer.prototype.start = function() {
  this.interval = setInterval(this.onTick, this.second);
  this.emit('start');
};

CountdownTimer.prototype.stop = function() {
    this.stopCount++;
    console.log('Stopping Stopwatch!');
    if (this.interval) {
        clearInterval(this.interval);
            console.log(this.stopCount);
            this.emit('stop');
        }

};

module.exports = CountdownTimer;