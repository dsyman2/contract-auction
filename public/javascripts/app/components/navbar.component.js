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
var metadata_1 = require("angular2/src/core/metadata");
var async_1 = require("angular2/src/facade/async");
var globalVars = require('../config/globals.js');
/* component in angular2 */
var NavbarComponent = (function () {
    function NavbarComponent() {
        this.buttonChoice = new async_1.EventEmitter();
        this.auctions = 'auctions';
        this.myAuctions = 'myAuctions';
        this.unresolved = 'unresolved';
        this.profile = 'profile';
        this.issues = 'issues';
        this.usersPage = 'usersPage';
        this.clickValue = this.auctions;
    }
    NavbarComponent.prototype.ngOnInit = function () {
        this.accountType = globalVars.accountType;
    };
    NavbarComponent.prototype.setMenuOption = function (option) {
        console.log('hi');
        this.clickValue = option;
        this.buttonChoice.emit(option);
    };
    __decorate([
        metadata_1.Output()
    ], NavbarComponent.prototype, "buttonChoice", void 0);
    NavbarComponent = __decorate([
        core_1.Component({
            selector: 'navbar',
            templateUrl: '/templates/navbar.html',
        })
    ], NavbarComponent);
    return NavbarComponent;
}());
exports.NavbarComponent = NavbarComponent;
