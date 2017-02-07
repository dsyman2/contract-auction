"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Created by Umar on 29/01/2017.
 */
var core_1 = require('angular2/core');
var auctionApp_component_js_1 = require('./auctionApp.component.js');
var metadata_1 = require("angular2/src/core/metadata");
/* component in angular2 */
var AuctionHolderComponent = (function () {
    function AuctionHolderComponent() {
        this.auctions = [];
        this.socket = null;
    }
    AuctionHolderComponent.prototype.ngOnInit = function () {
        //console.log("u" + this.user);
        this.user = localStorage.getItem('username');
        this.socket = io('http://localhost:8000');
        this.socket.on('auctionList', function (data) {
            this.auctions = data;
            console.log(this.auctions);
        }.bind(this));
    };
    __decorate([
        metadata_1.Input()
    ], AuctionHolderComponent.prototype, "user", void 0);
    AuctionHolderComponent = __decorate([
        core_1.Component({
            selector: 'auction-holder',
            templateUrl: '/templates/auctionHolder.html',
            directives: [auctionApp_component_js_1.AuctionAppComponent]
        })
    ], AuctionHolderComponent);
    return AuctionHolderComponent;
}());
exports.AuctionHolderComponent = AuctionHolderComponent;
