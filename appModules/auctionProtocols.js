/**
 * Created by Umar on 05/02/2017.
 */

var _  = require('underscore');

module.exports = {
    closedAuctionUsage : function(io, countdownTimer, id) {

        var bids = {};

        io.on('connection', function (socket) {
            socket.emit('priceUpdate-' + id, 'Closed Auction');
            socket.emit('timeRemaining-' + id, countdownTimer.time);
            socket.on('bid-' + id, function (data) {
                var newBidPrice = parseInt(data.bid);
                var newBidder = data.bidder;
                if(!(bids.hasOwnProperty(newBidder))) {
                    console.log('BID: ' + newBidPrice + ' From: ' +newBidder);
                    bids[newBidder] = newBidPrice;
                }

            });

            countdownTimer.once('stop', function() {
                if(!(_.isEmpty(bids))){
                    var winner = _.max(Object.keys(bids), function (b) { return bids[b]; });

                    socket.emit('priceUpdate-' + id, winner);
                    socket.broadcast.emit('priceUpdate-' + id, bids[winner]);
                    console.log('AUCTION + ' + id + ' has ended! --> Winner is: ' + winner);
                    socket.broadcast.emit('auctionEnd-' + id, {})

                }
                countdownTimer.removeAllListeners('stop');

            });
        });
    }
};