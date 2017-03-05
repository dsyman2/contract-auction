/**
 * Created by Umar on 02/03/2017.
 */
var _  = require('underscore');
var auctionTasks = require('./sharedProtocolTasks.js');
var CountdownTimer = require('../countdownTimer');

module.exports = {

    sealedBid: function (io, aucInfo, id, type, auctionEventEmitter, auctionFraud) {
        var countdownTimer = new CountdownTimer(aucInfo.length, id);
        var bids = {};
        var deleteStatus = false;
        countdownTimer.start();

        type = false;

        io.on('connection', function (socket) {
            socket.emit('priceUpdate-' + id, 'Closed Auction');
            socket.emit('timeRemaining-' + id, countdownTimer.time);
            socket.on('bid-' + id, function (data) {
                auctionFraud.updateUserBids(data.bidderID, aucInfo);
                var newBidPrice = +parseFloat(data.bid).toFixed(2);
                var newBidder = data.bidder;
                if (!(bids.hasOwnProperty(newBidder))) {
                    console.log('BID: ' + newBidPrice + ' From: ' + newBidder);
                    if (newBidPrice > 0) {
                        bids[newBidder] = newBidPrice;
                    }
                }
            });
        });

        countdownTimer.once('stop', function () {
            if (deleteStatus === false) {
                if (!(_.isEmpty(bids))) {
                    var winner = _.min(Object.keys(bids), function (b) {
                        return bids[b];
                    });
                    //var winningBidder = winner;
                    var winningBid = bids[winner];

                    if (type === false) {
                        console.log('hihihi');
                        bids = _.omit(bids, winner);
                        if (!_.isEmpty(bids)) {
                            var secondBestBidder = _.min(Object.keys(bids), function (b) {
                                return bids[b];
                            });
                            winningBid = bids[secondBestBidder];
                        }
                    }

                    io.sockets.emit('priceUpdate-' + id, winningBid);
                    //sockets.broadcast.emit('priceUpdate-' + id, winningBid);
                    console.log('AUCTION + ' + id + ' has ended! --> Winner is: ' + winner);
                    io.sockets.emit('auctionEnd-' + id, {});
                    aucInfo.price = winningBid;
                    aucInfo.winnerID = winner;
                    var auctionObj = {flag: 'result', aucInfo: aucInfo};
                    auctionTasks.moveCompletedAuction(auctionEventEmitter, auctionObj);
                }
                else {
                    auctionObj = {flag: 'unresolved', aucInfo: aucInfo};
                    auctionTasks.moveCompletedAuction(auctionEventEmitter, auctionObj);
                }


            }
            countdownTimer.removeAllListeners('stop');

        });

        auctionEventEmitter.on('delete-' + id, function () {
            deleteStatus = true;
            countdownTimer.stop();
        });
    }
};