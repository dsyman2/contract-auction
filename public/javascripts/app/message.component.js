System.register(['angular2/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var MessageComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            let MessageComponent = class MessageComponent {
                constructor() {
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
                sendMsg() {
                    this.socket.emit('chat msg', this.currentMessage);
                    this.currentMessage = '';
                }
            };
            MessageComponent = __decorate([
                core_1.Component({
                    selector: 'message-app',
                    templateUrl: '/templates/message.html'
                }), 
                __metadata('design:paramtypes', [])
            ], MessageComponent);
            exports_1("MessageComponent", MessageComponent);
        }
    }
});
//# sourceMappingURL=message.component.js.map