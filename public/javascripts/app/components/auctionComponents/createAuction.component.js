///<reference path="../../../../../node_modules/rxjs/Observable.d.ts"/>
/**
 * Created by Umar on 20/01/2017.
 */
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
var core_1 = require('angular2/core');
var common_1 = require('angular2/common');
var decorators_1 = require("angular2/src/core/di/decorators");
var http_1 = require('angular2/http');
require('rxjs/Rx');
require('rxjs/add/operator/first');
var validator_service_js_1 = require("../../services/validator.service.js");
var FormInputs = (function () {
    function FormInputs() {
        // creatorID: string;
        this.maxGuidePrice = '12000';
    }
    return FormInputs;
}());
var CreateAuctionComponent = (function () {
    function CreateAuctionComponent(validatorService, fb, http) {
        this.http = http;
        // http: Http;
        this.numberValidity = null;
        this.formInputs = new FormInputs();
        this.CreateGroup = fb.group({
            'auctionName': new common_1.Control(this.formInputs.auctionName, common_1.Validators.required),
            'auctionDesc': new common_1.Control(this.formInputs.auctionDesc, common_1.Validators.required),
            'length': new common_1.Control(this.formInputs.length, common_1.Validators.compose([common_1.Validators.required,
                validatorService.isInteger, validatorService.isNotZero])),
            'protocol': new common_1.Control(this.formInputs.protocol, common_1.Validators.required),
            'maxGuidePrice': new common_1.Control(this.formInputs.maxGuidePrice, common_1.Validators.compose([common_1.Validators.required,
                validatorService.isIntegerPrice(this.formInputs.protocol), validatorService.isNotZeroPrice(this.formInputs.protocol)]))
        });
    }
    CreateAuctionComponent.prototype.addNewGroup = function (formInputs) {
        this.formInputs = new FormInputs();
        var data = {
            name: formInputs.auctionName,
            description: formInputs.auctionDesc,
            length: formInputs.length,
            protocol: formInputs.protocol,
            maxGuidePrice: formInputs.maxGuidePrice
        };
        this.addAuctionPostRequest("/createAuction", data);
    };
    CreateAuctionComponent.prototype.addAuctionPostRequest = function (url, data) {
        console.log("auction name: " + data.auctionName);
        this.headers = new http_1.Headers();
        this.headers.append('Content-Type', 'application/json');
        var body = JSON.stringify(data);
        this.http.post(url, body, { headers: this.headers })
            .map(function (res) { return (res.json()); }).subscribe();
    };
    CreateAuctionComponent = __decorate([
        core_1.Component({
            selector: 'createAuction-app',
            templateUrl: '/templates/auctionTemplates/createAuction.html',
            directives: [common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES],
            providers: [validator_service_js_1.ValidatorService, http_1.HTTP_PROVIDERS]
        }),
        __param(0, decorators_1.Inject(validator_service_js_1.ValidatorService)),
        __param(1, decorators_1.Inject(common_1.FormBuilder)),
        __param(2, decorators_1.Inject(http_1.Http))
    ], CreateAuctionComponent);
    return CreateAuctionComponent;
}());
exports.CreateAuctionComponent = CreateAuctionComponent;
