/**
 * Created by Umar on 08/02/2017.
 */
module.exports = {
    dutchProtocol : function(io, CountdownTimer, id, maxPrice){
        var increment = (maxPrice/100).toFixed(2);
        var currentPrice = 0;
        var countdownTimer = new CountdownTimer();
        var counter = 0;
        var interval = 60000;
        countdownTimer.start();

        setInterval(function() {

            if(currentPrice < maxPrice){
                currentPrice+= increment;
            }

           io.sockets.emit('priceUpdate-' + id, currentPrice)
        }, interval);

        var currentBidder = null;

        io.on('connection', function (socket) {
            socket.emit('priceUpdate-' + id, currentPrice);
            socket.emit('timeRemaining-' + id, countdownTimer.time);
            socket.on('bid-' + id, function (data) {
                currentBidder = data.bidder;
                countdownTimer.stop();
                if(interval){
                    clearInterval(interval);
                }
                socket.emit('timeRemaining-' + id, 0);
                socket.broadcast.emit('timeRemaining-' + id, 0);
            });

        });

        countdownTimer.once('stop', function () {
            // currentPrice, id, userID(of currentPrice)
            if(counter < 1) {
                console.log('AUCTION: ' + id + " : " + currentBidder);
                io.sockets.emit('auctionEnd-' + id, id)
                // this.removeListener('stop');
                countdownTimer.removeAllListeners('stop');
                if(interval){
                    clearInterval(interval);
                }
            }
            counter++;
        });
    }
    //max price to pay
    //increment by x every y mins? --> max price / 100 every minute
    //only allow one bid, after that no more bids
    //announce winner
    //done?
};