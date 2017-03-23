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
var globals = require('../../config/configer.js');
var AuctionHolderComponent = (function () {
    function AuctionHolderComponent() {
        this.auctions = {};
        this.socket = null;
        this.filterContractType = 'All';
        this.filterTradeType = 'All';
        this.tradeTypes = globals.tradeTypes;
    }
    /**
     * On initialising do... instead of constructor so data can be passed in
     */
    AuctionHolderComponent.prototype.ngOnInit = function () {
        this.user = localStorage.getItem('username');
        this.socket = io(globals.socket_src);
        this.socket.on('auctionList', function (data) {
            this.auctions = data;
            this.arrayOfAucs = Object.keys(this.auctions);
        }.bind(this));
    };
    __decorate([
        metadata_1.Input()
    ], AuctionHolderComponent.prototype, "user", void 0);
    AuctionHolderComponent = __decorate([
        core_1.Component({
            selector: 'auction-holder',
            templateUrl: '/templates/auctionTemplates/auctionHolder.html',
            directives: [auctionApp_component_js_1.AuctionAppComponent]
        })
    ], AuctionHolderComponent);
    return AuctionHolderComponent;
}());
exports.AuctionHolderComponent = AuctionHolderComponent;
