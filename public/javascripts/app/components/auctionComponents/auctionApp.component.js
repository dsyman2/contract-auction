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
 * Created by Umar on 11/01/2017.
 */
var core_1 = require('angular2/core');
var metadata_1 = require("angular2/src/core/metadata");
var clockApp_component_js_1 = require('./clockApp.component.js');
var message_component_js_1 = require("./message.component.js");
var http_1 = require('angular2/http');
require('rxjs/Rx');
var decorators_1 = require("angular2/src/core/di/decorators");
var common_1 = require('angular2/common');
var validator_service_js_1 = require("../../services/validator.service.js");
var FormInputs = (function () {
    function FormInputs() {
    }
    return FormInputs;
}());
var AuctionAppComponent = (function () {
    function AuctionAppComponent(http, validatorService, fb) {
        this.http = http;
        this.price = 0.0;
        this.socket = null;
        this.time = 0;
        this.active = true;
        console.log('hihi');
        this.formInputs = new FormInputs();
        this.CreateGroup = fb.group({
            'bidValue': new common_1.Control(this.formInputs.bidValue, common_1.Validators.compose([common_1.Validators.required,
                validatorService.isInteger, validatorService.isNotZero]))
        });
    }
    AuctionAppComponent.prototype.ngOnInit = function () {
        console.log("username is:" + this.username);
        this.socket = io('http://localhost:8000');
        this.socket.on('priceUpdate-' + this.id, function (data) {
            this.price = data;
        }.bind(this));
        this.socket.on('auctionEnd-' + this.id, function (data) {
            console.log('over and out: ' + data);
        });
    };
    AuctionAppComponent.prototype.addNewGroup = function (formInputs) {
        this.formInputs = new FormInputs();
        var data = {
            bidVal: formInputs.bidValue,
        };
        this.bid(data);
    };
    AuctionAppComponent.prototype.bid = function (data) {
        this.socket.emit('bid-' + this.id, {
            bid: data.bidVal,
            bidder: this.username
        });
        this.formInputs.bidValue = null;
    };
    AuctionAppComponent.prototype.onTimeUp = function (data) {
        //alert(data);
        this.active = false;
    };
    AuctionAppComponent.prototype.sendDelete = function () {
        this.headers = new http_1.Headers();
        this.headers.append('Content-Type', 'application/json');
        var data = { id: this.id };
        var body = JSON.stringify(data);
        this.http.post("/deleteAuction", body, { headers: this.headers })
            .map(function (res) { return (res.json()); }).subscribe();
    };
    __decorate([
        metadata_1.Input()
    ], AuctionAppComponent.prototype, "auction", void 0);
    __decorate([
        metadata_1.Input()
    ], AuctionAppComponent.prototype, "id", void 0);
    __decorate([
        metadata_1.Input()
    ], AuctionAppComponent.prototype, "name", void 0);
    __decorate([
        metadata_1.Input()
    ], AuctionAppComponent.prototype, "desc", void 0);
    __decorate([
        metadata_1.Input()
    ], AuctionAppComponent.prototype, "creator", void 0);
    __decorate([
        metadata_1.Input()
    ], AuctionAppComponent.prototype, "username", void 0);
    __decorate([
        metadata_1.Input()
    ], AuctionAppComponent.prototype, "protocol", void 0);
    AuctionAppComponent = __decorate([
        core_1.Component({
            selector: 'auction-app',
            templateUrl: '/templates/auctionTemplates/auction.html',
            directives: [clockApp_component_js_1.ClockAppComponent, message_component_js_1.MessageComponent, common_1.FORM_DIRECTIVES],
            providers: [http_1.HTTP_PROVIDERS, validator_service_js_1.ValidatorService]
        }),
        __param(0, decorators_1.Inject(http_1.Http)),
        __param(1, decorators_1.Inject(validator_service_js_1.ValidatorService)),
        __param(2, decorators_1.Inject(common_1.FormBuilder))
    ], AuctionAppComponent);
    return AuctionAppComponent;
}());
exports.AuctionAppComponent = AuctionAppComponent;