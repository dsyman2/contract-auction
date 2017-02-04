var util = require('util');
var EventEmitter = require('events').EventEmitter;
var _  = require('underscore');

function CountdownTimer(length) {
    if(false === (this instanceof CountdownTimer)) {
        return new CountdownTimer();
    }

    this.day = 86400000;
    /*this.hour = 3600000;
    this.minute = 60000;*/
    this.second = 1000;
    this.time = this.day * length;
    this.interval = undefined;
    this.isActive = true;

    EventEmitter.call(this);

    _.bindAll(this, 'start', 'stop', 'onTick');
}

util.inherits(CountdownTimer, EventEmitter);


CountdownTimer.prototype.onTick = function() {
    //var remainder = this.time;
    //this.timeLeft = remainder;

    if (this.time === 0) {
        this.stop();
        this.isActive = false;
        return ;
    }

   /* var numDays = String(parseInt(remainder / this.day, 10));
    remainder -= this.day * numDays;

    var numHours = String(parseInt(remainder / this.hour, 10));
    remainder -= this.hour * numHours;

    var numMinutes = String(parseInt(remainder / this.minute, 10));
    remainder -= this.minute * numMinutes;

    var numSeconds = String(parseInt(remainder / this.second, 10));

    var output = _.map([numDays, numHours, numMinutes, numSeconds], function(str) {
        if (str.length === 1) {
            return "0" + str;
        }
        return str;
    }).join(":");*/

    this.emit('tick'/*, output*/);
    this.time -= this.second;
};

CountdownTimer.prototype.start = function() {
  this.interval = setInterval(this.onTick, this.second);
  this.emit('start');
};

CountdownTimer.prototype.stop = function() {
    console.log('Stopping Stopwatch!');
    if (this.interval) {
        clearInterval(this.interval);
        this.emit('stop');
    }
};

module.exports = CountdownTimer;