/**
 * Created by Umar on 05/02/2017.
 */

var _  = require('underscore');

var moveCompletedAuction = function(auctionEventEmitter, aucInfo){
    auctionEventEmitter.emit('moveCompletedAuc', aucInfo);
}

module.exports = {

    sealedBid : function(io, aucInfo, CountdownTimer, id, type, length, auctionEventEmitter) {
        var countdownTimer = new CountdownTimer(0.000347222, id);
        //countdownTimer.on('tick')
        var bids = {};
        var deleteStatus = false;
        countdownTimer.start();

        type = false;
        io.on('connection', function (socket) {
            socket.emit('priceUpdate-' + id, 'Closed Auction');
            socket.emit('timeRemaining-' + id, countdownTimer.time);
            socket.on('bid-' + id, function (data) {
                var newBidPrice = parseInt(data.bid);
                var newBidder = data.bidder;
                if(!(bids.hasOwnProperty(newBidder))) {
                    console.log('BID: ' + newBidPrice + ' From: ' + newBidder);
                    bids[newBidder] = newBidPrice;
                }

            });

        });

        countdownTimer.once('stop', function() {
            if(deleteStatus === false) {
                if (!(_.isEmpty(bids))) {
                    var winner = _.min(Object.keys(bids), function (b) {
                        return bids[b];
                    });
                    //var winningBidder = winner;
                    var winningBid = bids[winner];

                    if (type === false) {
                        console.log('hihihi');
                        bids = _.omit(bids, winner);
                        if(!_.isEmpty(bids)){
                            var secondBestBidder = _.min(Object.keys(bids), function (b) {
                                return bids[b];
                            });
                            winningBid = bids[secondBestBidder];
                        }
                    }

                    io.sockets.emit('priceUpdate-' + id, winningBid);
                    //sockets.broadcast.emit('priceUpdate-' + id, winningBid);
                    console.log('AUCTION + ' + id + ' has ended! --> Winner is: ' + winner);
                    io.sockets.emit('auctionEnd-' + id, {})
                    aucInfo.price = winningBid;
                    aucInfo.winnerID = winner;
                    moveCompletedAuction(auctionEventEmitter, aucInfo);
                }
                else{
                /*    aucInfo.price = undefined;
                    aucInfo.winnerID = '';
                    moveCompletedAuction(auctionEventEmitter, aucInfo);*/
                }


            }
            countdownTimer.removeAllListeners('stop');

        });

        auctionEventEmitter.on('delete-' + id, function(){
            deleteStatus = true;
            countdownTimer.stop();
        });
    },

    dutch : function(io, aucInfo, CountdownTimer, id, maxPrice, length, auctionEventEmitter){
        var increment = (maxPrice/100)/*.toFixed(2)*/;
        var currentPrice = +(increment.toFixed(2));
        var countdownTimer = new CountdownTimer(0.5, id);
        var interval = 60000;
        var deleteStatus = false;
        console.log(auctionEventEmitter);

        countdownTimer.start();

        var intervalID = setInterval(function() {

            if(currentPrice < maxPrice){
                currentPrice = +((currentPrice + increment).toFixed(2));
                //currentPrice = parseFloat(currentPrice).toFixed(2);
               // currentPrice = (parseFloat(currentPrice)).toFixed(2);
            }
            console.log('emitting price: ' + currentPrice);
            io.sockets.emit('priceUpdate-' + id, currentPrice)
        }, interval);

        var currentBidder = null;

        io.on('connection', function (socket) {
            socket.emit('priceUpdate-' + id, currentPrice);
            socket.emit('timeRemaining-' + id, countdownTimer.time);
            socket.on('bid-' + id, function (data) {
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
                aucInfo.price = currentPrice;
                aucInfo.winnerID = currentBidder;
                if(currentBidder != null){
                    moveCompletedAuction(auctionEventEmitter, aucInfo);
                }
                else{
                    /*aucInfo.price = currentPrice;
                    aucInfo.winnerID = ' ';
                    moveCompletedAuction(auctionEventEmitter, aucInfo);*/
                }
            }
        });

        auctionEventEmitter.on('delete-' + id, function(){
            deleteStatus = true;
            countdownTimer.stop();
        });
    },

    english : function(io, aucInfo, CountdownTimer, id, length, auctionEventEmitter){
        var countdownTimer = new CountdownTimer(0.000347222, id);
        //countdownTimer.on('tick')

        countdownTimer.start();
        var currentPrice = 9999;
        var currentBidder = null;
        var deleteStatus = false;

        io.on('connection', function (socket) {
            socket.emit('priceUpdate-' + id, currentPrice);
            socket.emit('timeRemaining-' + id, countdownTimer.time);
            socket.on('bid-' + id, function (data) {
                var newBidPrice = parseInt(data.bid);
                var newBidder = data.bidder;
                console.log('BID: ' + newBidPrice + newBidder);
                /*** TO BE CHANGED WITH PROTOCOL***/
                if (currentPrice > newBidPrice) {
                    currentPrice = newBidPrice;
                    currentBidder = newBidder;
                    socket.emit('priceUpdate-' + id, currentPrice);
                    socket.broadcast.emit('priceUpdate-' + id, currentPrice);
                }
            });
            // console.log('yeaah')

        });

        countdownTimer.once('stop', function () {
            // currentPrice, id, userID(of currentPrice)
            if(deleteStatus === false) {
                console.log('AUCTION: ' + id);
                io.sockets.emit('auctionEnd-' + id, id);
                // this.removeListener('stop');
                countdownTimer.removeAllListeners('stop');
                aucInfo.price = currentPrice;
                aucInfo.winnerID = currentBidder;
                if(currentBidder != null){
                    moveCompletedAuction(auctionEventEmitter, aucInfo);
                }
                else{
                    /*aucInfo.price = currentPrice;
                    aucInfo.winnerID = ' ';
                    moveCompletedAuction(auctionEventEmitter, aucInfo);*/
                }
            }
        });

        auctionEventEmitter.on('delete-' + id, function(){
            deleteStatus = true;
            countdownTimer.stop();
        });
    }

    //decrement auction by how much each time?
};