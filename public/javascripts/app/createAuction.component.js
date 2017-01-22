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
var FormInputs = (function () {
    function FormInputs() {
    }
    return FormInputs;
}());
var CreateAuctionComponent = (function () {
    function CreateAuctionComponent(fb) {
        this.formInputs = new FormInputs();
        this.CreateGroup = fb.group({
            'auctionName': new common_1.Control(this.formInputs.auctionName, common_1.Validators.required),
            'auctionDesc': new common_1.Control(this.formInputs.auctionDesc, common_1.Validators.required),
            'length': new common_1.Control(this.formInputs.length, common_1.Validators.required),
            'protocol': new common_1.Control(this.formInputs.protocol, common_1.Validators.required),
            'creatorID': new common_1.Control(this.formInputs.creatorID, common_1.Validators.required)
        });
    }
    CreateAuctionComponent.prototype.addNewGroup = function (formInputs) {
        this.formInputs = new FormInputs();
    };
    CreateAuctionComponent = __decorate([
        core_1.Component({
            selector: 'createAuction-app',
            templateUrl: '/templates/createAuction.html',
            directives: [common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES]
        }),
        __param(0, decorators_1.Inject(common_1.FormBuilder))
    ], CreateAuctionComponent);
    return CreateAuctionComponent;
}());
exports.CreateAuctionComponent = CreateAuctionComponent;
