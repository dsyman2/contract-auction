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
var metadata_1 = require("angular2/src/core/metadata");
var http_1 = require("angular2/http");
var base_request_options_1 = require("angular2/src/http/base_request_options");
var url_search_params_1 = require("angular2/src/http/url_search_params");
var http_2 = require("angular2/src/http/http");
var decorators_1 = require("angular2/src/core/di/decorators");
var headers_1 = require("angular2/src/http/headers");
var AuctionResultComponent = (function () {
    function AuctionResultComponent(http) {
        this.http = http;
        this.options = new base_request_options_1.RequestOptions({ headers: new headers_1.Headers({ 'Content-Type': 'application/json' }) });
        this.resultView = false;
    }
    AuctionResultComponent.prototype.ngOnInit = function () {
        console.log(this.protocol);
        var idChoice = (this.winner == localStorage.getItem('userID')) ?
            this.creator : this.winner;
        this.getContactsByID(idChoice);
    };
    AuctionResultComponent.prototype.updateRes = function () {
        this.resultView = true;
        this.contactUsername = this.details.username;
        this.contactEmail = this.details.email;
        this.contactNum = this.details.contactNumber;
    };
    AuctionResultComponent.prototype.getContactsByID = function (id) {
        var _this = this;
        var params = new url_search_params_1.URLSearchParams();
        params.set("id", id);
        this.options.search = params;
        return this.http.get('/contactDetails', this.options)
            .subscribe(function (details) { return _this.details = details.json(); }, function () { return console.log('hi' + _this.details); }, function () { return console.log('lol'); });
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
            templateUrl: '/templates/resultTemplates/result.html',
            providers: [http_1.HTTP_PROVIDERS]
        }),
        __param(0, decorators_1.Inject(http_2.Http))
    ], AuctionResultComponent);
    return AuctionResultComponent;
}());
exports.AuctionResultComponent = AuctionResultComponent;
