/**
 * Created by Umar on 02/03/2017.
 */
var auctionTasks = require('./sharedProtocolTasks.js');
var CountdownTimer = require('../countdownTimer');

module.exports = {
    dutch : function(io, aucInfo, id, auctionEventEmitter, auctionFraud){
        var maxPrice = aucInfo.maxGuidePrice;
        var increment = (maxPrice/100)/*.toFixed(2)*/;
        var currentPrice = +(increment.toFixed(2));
        var countdownTimer = new CountdownTimer(aucInfo.length, id);
        var interval = 60000;
        var deleteStatus = false;
        console.log(auctionEventEmitter);

        countdownTimer.start();

        var intervalID = setInterval(function() {

            if(currentPrice < maxPrice){
                currentPrice = +((currentPrice + increment).toFixed(2));
                console.log('emitting price: ' + currentPrice);
                io.sockets.emit('priceUpdate-' + id, currentPrice);
            }
            /* console.log('emitting price: ' + currentPrice);
             io.sockets.emit('priceUpdate-' + id, currentPrice);*/
        }, interval);

        var currentBidder = null;

        io.on('connection', function (socket) {
            socket.emit('priceUpdate-' + id, currentPrice);
            socket.emit('timeRemaining-' + id, countdownTimer.time);
            socket.on('bid-' + id, function (data) {

                auctionFraud.updateUserBids(data.bidderID, data.bidder, aucInfo);
                currentBidder = data.bidder;
                countdownTimer.stop();
                if(intervalID){
                    clearInterval(intervalID);
                }
                socket.emit('timeRemaining-' + id, 0);
                socket.broadcast.emit('timeRemaining-' + id, 0);
            });
        });

        countdownTimer.once('stop', function () {
            // currentPrice, id, userID(of currentPrice)
            if(deleteStatus === false) {
                console.log('AUCTION: ' + id + " : " + currentBidder);
                io.sockets.emit('auctionEnd-' + id, id);
                // this.removeListener('stop');
                countdownTimer.removeAllListeners('stop');
                if(intervalID){
                    clearInterval(intervalID);
                }

                if(currentBidder != null){
                    aucInfo.price = currentPrice;
                    aucInfo.winnerID = currentBidder;
                    var auctionObj = {flag: 'result', aucInfo: aucInfo};
                    auctionTasks.moveCompletedAuction(auctionEventEmitter, auctionObj);
                }
                else{
                    auctionObj = {flag: 'unresolved', aucInfo: aucInfo};
                    auctionTasks.moveCompletedAuction(auctionEventEmitter, auctionObj);
                }
            }
        });

        auctionEventEmitter.on('delete-' + id, function(){
            deleteStatus = true;
            if(intervalID){
                clearInterval(intervalID);
            }
            countdownTimer.stop();
        });
    }
};