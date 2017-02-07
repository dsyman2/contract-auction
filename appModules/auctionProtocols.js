/**
 * Created by Umar on 05/02/2017.
 */

var _  = require('underscore');

module.exports = {
    closedAuctionUsage : function(io, countdownTimer, id, type) {
        var count = 0;
        var bids = {};
        type = false;
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
                if(count == 0) {
                    if (!(_.isEmpty(bids))) {
                        var winner = _.min(Object.keys(bids), function (b) {
                            return bids[b];
                        });
                        //var winningBidder = winner;
                        var winningBid = bids[winner];

                        if (type === false && !_.isEmpty(bids)) {
                            console.log('hihihi');
                            bids = _.omit(bids, winner);
                            var secondBestBidder = _.min(Object.keys(bids), function (b) {
                                return bids[b];
                            });
                            winningBid = bids[secondBestBidder];
                        }

                        socket.emit('priceUpdate-' + id, winningBid);
                        socket.broadcast.emit('priceUpdate-' + id, winningBid);
                        console.log('AUCTION + ' + id + ' has ended! --> Winner is: ' + winner);
                        socket.broadcast.emit('auctionEnd-' + id, {})

                    }
                    count++;
                }
                countdownTimer.removeAllListeners('stop');

            });
        });
    }
};