"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Created by Umar on 12/02/2017.
 */
var core_1 = require('angular2/core');
var metadata_1 = require("angular2/src/core/metadata");
var AuctionResultComponent = (function () {
    function AuctionResultComponent() {
    }
    AuctionResultComponent.prototype.ngOnInit = function () {
        console.log(this.protocol);
    };
    __decorate([
        metadata_1.Input()
    ], AuctionResultComponent.prototype, "result", void 0);
    __decorate([
        metadata_1.Input()
    ], AuctionResultComponent.prototype, "id", void 0);
    __decorate([
        metadata_1.Input()
    ], AuctionResultComponent.prototype, "aucID", void 0);
    __decorate([
        metadata_1.Input()
    ], AuctionResultComponent.prototype, "name", void 0);
    __decorate([
        metadata_1.Input()
    ], AuctionResultComponent.prototype, "desc", void 0);
    __decorate([
        metadata_1.Input()
    ], AuctionResultComponent.prototype, "creator", void 0);
    __decorate([
        metadata_1.Input()
    ], AuctionResultComponent.prototype, "username", void 0);
    __decorate([
        metadata_1.Input()
    ], AuctionResultComponent.prototype, "protocol", void 0);
    __decorate([
        metadata_1.Input()
    ], AuctionResultComponent.prototype, "winner", void 0);
    __decorate([
        metadata_1.Input()
    ], AuctionResultComponent.prototype, "price", void 0);
    AuctionResultComponent = __decorate([
        core_1.Component({
            selector: 'result-app',
            templateUrl: '/templates/result.html',
        })
    ], AuctionResultComponent);
    return AuctionResultComponent;
}());
exports.AuctionResultComponent = AuctionResultComponent;
