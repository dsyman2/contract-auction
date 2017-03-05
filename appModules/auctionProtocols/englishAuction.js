/**
 * Created by Umar on 02/03/2017.
 */
var auctionTasks = require('./sharedProtocolTasks.js');
var CountdownTimer = require('../countdownTimer');

module.exports = {
    english : function(io, aucInfo, id, auctionEventEmitter, auctionFraud){
        var countdownTimer = new CountdownTimer(parseInt(aucInfo.length), id);
        //countdownTimer.on('tick')
        console.log("YAAY: " + aucInfo.length);
        countdownTimer.start();
        var currentPrice = aucInfo.maxGuidePrice;
        var currentBidder = null;
        var deleteStatus = false;

        io.on('connection', function (socket) {
            socket.emit('priceUpdate-' + id, currentPrice);
            socket.emit('timeRemaining-' + id, countdownTimer.time);
            socket.on('bid-' + id, function (data) {

                auctionFraud.updateUserBids(data.bidderID, data.bidder, aucInfo);
                var newBidPrice = +parseFloat(data.bid).toFixed(2);
                var newBidder = data.bidder;
                console.log('BID: ' + newBidPrice + newBidder);
                if (currentPrice > newBidPrice) {
                    currentPrice = newBidPrice;
                    currentBidder = newBidder;

                    if(countdownTimer.time < 10000){
                        countdownTimer.time = countdownTimer.time + 10000;
                    }

                    socket.emit('timeRemaining-' + id, countdownTimer.time);
                    socket.broadcast.emit('timeRemaining-' + id, countdownTimer.time);
                    socket.emit('priceUpdate-' + id, currentPrice);
                    socket.broadcast.emit('priceUpdate-' + id, currentPrice);
                }
            });
        });

        countdownTimer.once('stop', function () {
            if(deleteStatus === false) {
                console.log('AUCTION: ' + id);
                io.sockets.emit('auctionEnd-' + id, id);
                // this.removeListener('stop');
                countdownTimer.removeAllListeners('stop');
                var auctionObj = null;
                if(currentBidder != null){
                    aucInfo.price = currentPrice;
                    aucInfo.winnerID = currentBidder;
                    auctionObj = {flag: 'result', aucInfo: aucInfo};
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
            countdownTimer.stop();
        });
    }
};