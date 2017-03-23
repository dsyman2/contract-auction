/**
 * Created by Umar on 19/01/2017.
 *
 * This is the message engine module, this is where
 * every auction calls to create a message chat for
 * their respective auction.
 */
module.exports = {

    /**
     * Initiates message engine for given auctio id
     * @param io
     * @param id
     */
    messageEngine : function (io, id) {
        var msgs = [];

        io.on('connection', function(socket){
            socket.emit('chat msgs-' + id, msgs);

            socket.on('chat msg-' + id, function(msg){
                msgs.push(msg);
                socket.emit('chat msg-' + id, msg);
                socket.broadcast.emit('chat msg-' + id, msg);
            });
        });
    }
};