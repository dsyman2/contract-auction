"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Created by Umar on 11/01/2017.
 */
var core_1 = require('angular2/core');
var MessageComponent = (function () {
    function MessageComponent() {
        this.socket = null;
        this.messages = [];
        this.currentMessage = '';
        this.socket = io('http://localhost:8000');
        this.socket.on('chat msgs', function (msgs) {
            var tempMessages = [];
            tempMessages = this.messages;
            this.messages = tempMessages.concat(msgs);
        }.bind(this));
        this.socket.on('chat msg', function (msg) {
            this.messages.push(msg);
        }.bind(this));
    }
    MessageComponent.prototype.sendMsg = function () {
        this.socket.emit('chat msg', this.currentMessage);
        this.currentMessage = '';
    };
    MessageComponent = __decorate([
        core_1.Component({
            selector: 'message-app',
            templateUrl: '/templates/message.html'
        })
    ], MessageComponent);
    return MessageComponent;
}());
exports.MessageComponent = MessageComponent;
