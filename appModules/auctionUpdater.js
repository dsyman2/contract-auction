/**
 * Created by Umar on 19/01/2017.
 */
var currentPrice = 9999;

io.on('connection', function (socket) {
    socket.emit('priceUpdate', currentPrice);
    socket.on('bid', function (data) {
        var newBidPrice = parseInt(data);
        if(currentPrice > newBidPrice){
            currentPrice = newBidPrice;
            socket.emit('priceUpdate', currentPrice);
            socket.broadcast.emit('priceUpdate', currentPrice);
        }

    });
});