/**
 * Created by Umar on 05/02/2017.
 */
module.exports = {
    closedAuctionUsage : function(io, countdownTimer, id) {
        var currentPrice = Number.MAX_VALUE;
        var currentBidder = undefined;
        var bidders = [];

        io.on('connection', function (socket) {
            socket.emit('priceUpdate-' + id, 'Closed Auction');
            socket.emit('timeRemaining-' + id, countdownTimer.time);
            socket.on('bid-' + id, function (data) {
                var newBidPrice = parseInt(data.bid);
                var newBidder = data.bidder;
                if(bidders.indexOf(newBidder) == -1) {
                    bidders.push(newBidder);
                    console.log('BID: ' + newBidPrice + newBidder);
                    /*** TO BE CHANGED WITH PROTOCOL***/
                    if (currentPrice > newBidPrice) {
                        currentPrice = newBidPrice;
                        currentBidder = newBidder;
                        // socket.emit('priceUpdate-' + id, currentPrice);
                        // socket.broadcast.emit('priceUpdate-' + id, currentPrice);
                    }
                }

            });

            countdownTimer.once('stop', function(){
                if(currentPrice != Number.MAX_VALUE){
                    socket.emit('priceUpdate-' + id, currentPrice);
                    socket.broadcast.emit('priceUpdate-' + id, currentPrice);
                    // currentPrice, id, userID(of currentPrice)
                    console.log('AUCTION + ' + id + ' has ended! --> Winner is: ' + currentBidder);
                    //socket.broadcast.emit('auctionEnd-' + id, {})
                }
                countdownTimer.removeAllListeners('stop');

            });
        });
    }
};