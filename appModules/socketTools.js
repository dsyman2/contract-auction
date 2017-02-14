/**
 * Created by Umar on 19/01/2017.
 */
module.exports = {

    messageEngine : function (io, id) {
        var msgs = [];

        io.on('connection', function(socket){
            socket.emit('chat msgs-' + id, msgs);

            socket.on('chat msg-' + id, function(msg){
                msgs.push(msg);
                console.log("Message: " + msg);
                socket.emit('chat msg-' + id, msg);
                socket.broadcast.emit('chat msg-' + id, msg);
            });
        });
    }
};