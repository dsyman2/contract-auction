/**
 * Created by Umar on 11/01/2017.
 */
import {Component} from 'angular2/core';
import {Input} from "angular2/src/core/metadata";

@Component({
    selector: 'message-app',
    templateUrl: '/templates/message.html'
})

export class MessageComponent {
    socket = null;
    messages = [];
    currentMessage = '';
    @Input()id : string;
    @Input()username : string;

    ngOnInit(){
        this.socket = io('http://localhost:8000');

        this.socket.on('chat msgs-' + this.id, function (msgs){
            var tempMessages = [];
            tempMessages = this.messages;
            this.messages = tempMessages.concat(msgs)
        }.bind(this));

        this.socket.on('chat msg-' + this.id, function(msg){
            this.messages.push(msg);
            console.log(msg);
        }.bind(this));
    }

    sendMsg(){
        this.socket.emit('chat msg-' + this.id, this.username + ': ' + this.currentMessage);
        this.currentMessage = '';
    }
}