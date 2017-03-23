/**
 * Created by Umar on 11/01/2017.
 */
import {Component} from 'angular2/core';
import {Input} from "angular2/src/core/metadata";
import globals = require('../../config/configer.js');

@Component({
    selector: 'message-app',
    templateUrl: '/templates/auctionTemplates/message.html'
})

/**
 * Message component is the message app within the auction widget
 */
export class MessageComponent {
    socket = null;
    messages = [];
    currentMessage = '';
    @Input()id : string;
    @Input()username : string;

    /**
     * On initialising do... instead of constructor so data can be passed in
     */
    ngOnInit(){
        this.socket = io(globals.socket_src);

        this.socket.on('chat msgs-' + this.id, function (msgs){
            var tempMessages = [];
            tempMessages = this.messages;
            this.messages = tempMessages.concat(msgs)
        }.bind(this));

        this.socket.on('chat msg-' + this.id, function(msg){
            this.messages.push(msg);
        }.bind(this));
    }

    /**
     * Sends the message via sockets
     */
    sendMsg(){
        this.socket.emit('chat msg-' + this.id, this.username + ': ' + this.currentMessage);
        this.currentMessage = '';
    }
}