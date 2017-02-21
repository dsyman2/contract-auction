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
 * Created by Umar on 13/02/2017.
 */
var core_1 = require('angular2/core');
var auctionHolder_component_js_1 = require("./auctionComponents/auctionHolder.component.js");
var resultHolder_component_js_1 = require("./resultComponents/resultHolder.component.js");
var metadata_1 = require("angular2/src/core/metadata");
var navbar_component_js_1 = require("./navbar.component.js");
var unresolvedHolder_component_js_1 = require("./unresolvedComponents/unresolvedHolder.component.js");
var notifications_component_js_1 = require('../notifications/notifications.component.js');
var notifications_service_js_1 = require("../notifications/notifications.service.js");
var router_1 = require("angular2/router");
var decorators_1 = require("angular2/src/core/di/decorators");
var profileUpdater_component_js_1 = require("./profileUpdater.component.js");
/* component in angular2 */
var MainComponent = (function () {
    function MainComponent(_notes) {
        this._notes = _notes;
        this.buttonClickVal = "auctions";
        console.log('hi');
    }
    MainComponent.prototype.ngOnInit = function () {
        //console.log("u" + this.user);
        this.user = localStorage.getItem('username');
        //this.throwPushNotification('hi everyone you');
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
            directives: [auctionHolder_component_js_1.AuctionHolderComponent, resultHolder_component_js_1.ResultHolderComponent, navbar_component_js_1.NavbarComponent,
                unresolvedHolder_component_js_1.UnresolvedHolderComponent, notifications_component_js_1.Notifications, router_1.ROUTER_DIRECTIVES, profileUpdater_component_js_1.ProfileUpdaterComponent]
        }),
        __param(0, decorators_1.Inject(notifications_service_js_1.NotificationsService))
    ], MainComponent);
    return MainComponent;
}());
exports.MainComponent = MainComponent;
