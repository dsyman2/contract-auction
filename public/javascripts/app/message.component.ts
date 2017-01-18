/**
 * Created by Umar on 11/01/2017.
 */
import {Component} from 'angular2/core';

@Component({
    selector: 'message-app',
    templateUrl: '/templates/message.html'
})

export class MessageComponent {
    socket = null;
    messages = [];
    currentMessage = '';

    constructor(){
        this.socket = io('http://localhost:8000');

        this.socket.on('chat msgs', function (msgs){
            var tempMessages = [];
            tempMessages = this.messages;
            this.messages = tempMessages.concat(msgs)
        }.bind(this));

        this.socket.on('chat msg', function(msg){
            this.messages.push(msg);
        }.bind(this));
    }

    sendMsg(){
        this.socket.emit('chat msg', this.currentMessage)
        this.currentMessage = '';
    }
}