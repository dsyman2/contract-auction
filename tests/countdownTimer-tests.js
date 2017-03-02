/**
 * Created by Umar on 21/02/2017.
 */
var chai = require('chai');
var expect = chai.expect;
var CountdownTimer = require('../appModules/countdownTimer.js');

describe('countdownTimer', function(){

    it('time test, we should see no decrease from the time we enter as no tick has occurred', function(){
        var length = 2;
        var countdownTimer = new CountdownTimer(length);
        countdownTimer.start();
        length = length * countdownTimer.day;
        expect(countdownTimer.time).to.equal(length);
    });

    it('if length is zero then a timer should be inactive after initial tick', function(){
        var length = 0;
        var countdownTimer = new CountdownTimer(length);
        countdownTimer.start();
        countdownTimer.onTick();
        expect(countdownTimer.isActive).to.equal(false);
    });

    it('ensure interval is cleared after clock has stopped, should be null', function(){
        var length = 0;
        var countdownTimer = new CountdownTimer(length);
        countdownTimer.start();
        countdownTimer.stop();
        expect(countdownTimer.interval['0']).to.equal(null);
    });

    it('After tick the time should be less than started', function(){
        var length = 5;
        var countdownTimer = new CountdownTimer(length);
        countdownTimer.start();
        countdownTimer.onTick();
        length = length * countdownTimer.day;
        expect(length).to.not.equal(countdownTimer.time);
    });

    it('Starting an auction with a -ve time, should be detected during initial tick', function () {
       var length = -1;
       var countdownTimer = new CountdownTimer(length);
       countdownTimer.start();
       expect(countdownTimer.isActive).to.equal(true);
       countdownTimer.onTick();
       expect(countdownTimer.isActive).to.equal(false);
    });

});