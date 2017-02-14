"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Created by Umar on 13/02/2017.
 */
var core_1 = require('angular2/core');
var auctionHolder_component_js_1 = require("./auctionHolder.component.js");
var resultHolder_component_js_1 = require("./resultHolder.component.js");
var metadata_1 = require("angular2/src/core/metadata");
var navbar_component_js_1 = require("./navbar.component.js");
/* component in angular2 */
var MainComponent = (function () {
    function MainComponent() {
        this.buttonClickVal = "auctions";
    }
    MainComponent.prototype.ngOnInit = function () {
        //console.log("u" + this.user);
        this.user = localStorage.getItem('username');
    };
    MainComponent.prototype.onMenuChoice = function (optionPicked) {
        console.log('hi: ' + optionPicked);
        this.buttonClickVal = optionPicked;
    };
    __decorate([
        metadata_1.Input()
    ], MainComponent.prototype, "user", void 0);
    MainComponent = __decorate([
        core_1.Component({
            selector: 'main-holder',
            templateUrl: '/templates/main.html',
            directives: [auctionHolder_component_js_1.AuctionHolderComponent, resultHolder_component_js_1.ResultHolderComponent, navbar_component_js_1.NavbarComponent]
        })
    ], MainComponent);
    return MainComponent;
}());
exports.MainComponent = MainComponent;
