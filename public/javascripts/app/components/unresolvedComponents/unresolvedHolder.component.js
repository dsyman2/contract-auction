"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/**
 * Created by Umar on 15/02/2017.
 */
var core_1 = require('angular2/core');
require('rxjs/Rx');
var http_1 = require("angular2/http");
var decorators_1 = require("angular2/src/core/di/decorators");
var auctionUnresolved_component_js_1 = require("./auctionUnresolved.component.js");
var UnresolvedHolderComponent = (function () {
    function UnresolvedHolderComponent(http) {
        this.http = http;
        console.log('getunresolved');
        this.getUnresolved();
    }
    UnresolvedHolderComponent.prototype.getUnresolved = function () {
        var _this = this;
        console.log('getunresolved');
        this.http.get("/unresolvedAuctions", {})
            .subscribe(function (unresolvedList) { return _this.unresolvedList = unresolvedList.json(); }, function () { return console.log(_this.unresolvedList); });
        //this.results = x;
    };
    UnresolvedHolderComponent = __decorate([
        core_1.Component({
            selector: 'unresolved-holder',
            templateUrl: '/templates/unresolvedTemplates/unresolvedHolder.html',
            providers: [http_1.HTTP_PROVIDERS],
            directives: [auctionUnresolved_component_js_1.AuctionUnresolvedComponent]
        }),
        __param(0, decorators_1.Inject(http_1.Http))
    ], UnresolvedHolderComponent);
    return UnresolvedHolderComponent;
}());
exports.UnresolvedHolderComponent = UnresolvedHolderComponent;
