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
 * Created by Umar on 12/02/2017.
 */
var core_1 = require('angular2/core');
require('rxjs/Rx');
var http_1 = require("angular2/http");
var decorators_1 = require("angular2/src/core/di/decorators");
var globals = require('../../config/globals.js');
var auctionResult_component_js_1 = require("./auctionResult.component.js");
var ResultHolderComponent = (function () {
    function ResultHolderComponent(http) {
        this.http = http;
        this.won = false;
        this.createdB = false;
        this.getCreatedAucResults();
        this.getWonAucResults();
    }
    /**
     * On initialising do... instead of constructor so data can be passed in
     */
    ResultHolderComponent.prototype.ngOnInit = function () {
        this.accountType = globals.accountType;
    };
    /**
     * Get request for all completed auctions which are created by contract issuers
     */
    ResultHolderComponent.prototype.getCreatedAucResults = function () {
        var _this = this;
        this.http.get("/completedAuctions", {})
            .subscribe(function (createdList) { return _this.createdList = createdList.json().reverse(); }, function () { return _this.createdB = true; });
    };
    /**
     * Get request for all won auctions which are created by contractors
     */
    ResultHolderComponent.prototype.getWonAucResults = function () {
        var _this = this;
        this.http.get("/wonAuctions", {})
            .subscribe(function (wonList) { return _this.wonList = wonList.json().reverse(); }, function () { return _this.won = true; });
    };
    ResultHolderComponent = __decorate([
        core_1.Component({
            selector: 'result-holder',
            templateUrl: '/templates/resultTemplates/resultHolder.html',
            providers: [http_1.HTTP_PROVIDERS],
            directives: [auctionResult_component_js_1.AuctionResultComponent]
        }),
        __param(0, decorators_1.Inject(http_1.Http))
    ], ResultHolderComponent);
    return ResultHolderComponent;
}());
exports.ResultHolderComponent = ResultHolderComponent;
