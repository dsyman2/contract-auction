/**
 * Created by Umar on 19/01/2017.
 */
module.exports = {

    auctionEngine : function (io) {

        var currentPrice = 9999;

        io.on('connection', function (socket) {
            socket.emit('priceUpdate', currentPrice);
            socket.on('bid', function (data) {
                var newBidPrice = parseInt(data);
                if (currentPrice > newBidPrice) {
                    currentPrice = newBidPrice;
                    socket.emit('priceUpdate', currentPrice);
                    socket.broadcast.emit('priceUpdate', currentPrice);
                }
            });
        });
    },

    messageEngine : function (io) {
        var msgs = [];

        io.on('connection', function(socket){
            socket.emit('chat msgs', msgs);

            socket.on('chat msg', function(msg){
                msgs.push(msg);
                console.log("Message: " + msg);
                socket.emit('chat msg', msg);
                socket.broadcast.emit('chat msg', msg);
            });
        });
    }
};