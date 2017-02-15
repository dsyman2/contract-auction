/**
 * Created by Umar on 15/02/2017.
 */
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('angular2/core');
var metadata_1 = require("angular2/src/core/metadata");
var AuctionUnresolvedComponent = (function () {
    function AuctionUnresolvedComponent() {
    }
    AuctionUnresolvedComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        metadata_1.Input()
    ], AuctionUnresolvedComponent.prototype, "unresolved", void 0);
    __decorate([
        metadata_1.Input()
    ], AuctionUnresolvedComponent.prototype, "id", void 0);
    __decorate([
        metadata_1.Input()
    ], AuctionUnresolvedComponent.prototype, "unresolvedID", void 0);
    __decorate([
        metadata_1.Input()
    ], AuctionUnresolvedComponent.prototype, "name", void 0);
    __decorate([
        metadata_1.Input()
    ], AuctionUnresolvedComponent.prototype, "desc", void 0);
    __decorate([
        metadata_1.Input()
    ], AuctionUnresolvedComponent.prototype, "creator", void 0);
    __decorate([
        metadata_1.Input()
    ], AuctionUnresolvedComponent.prototype, "username", void 0);
    __decorate([
        metadata_1.Input()
    ], AuctionUnresolvedComponent.prototype, "protocol", void 0);
    AuctionUnresolvedComponent = __decorate([
        core_1.Component({
            selector: 'unresolved-app',
            templateUrl: '/templates/unresolvedTemplates/unresolved.html',
        })
    ], AuctionUnresolvedComponent);
    return AuctionUnresolvedComponent;
}());
exports.AuctionUnresolvedComponent = AuctionUnresolvedComponent;
