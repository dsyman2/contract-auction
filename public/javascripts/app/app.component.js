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
/* component in angular2 */
var AppComponent = (function () {
    function AppComponent() {
        this.price = 0.0;
        this.socket = null;
        this.bidValue = '';
        this.socket = io('http://localhost:8000');
        this.socket.on('priceUpdate', function (data) {
            this.price = data;
        }.bind(this));
    }
    AppComponent.prototype.bid = function () {
        this.socket.emit('bid', this.bidValue);
        this.bidValue = '';
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'auction-app',
            templateUrl: '/templates/product.html'
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
