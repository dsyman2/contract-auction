"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Created by Umar on 01/03/2017.
 */
var metadata_1 = require("angular2/src/core/metadata");
var async_1 = require("angular2/src/facade/async");
var UserInfoComponent = (function () {
    function UserInfoComponent() {
        this.deleteUserEvent = new async_1.EventEmitter();
    }
    /**
     * Emits a delete signal to the controller
     */
    UserInfoComponent.prototype.sendDelete = function () {
        this.deleteUserEvent.emit(this.id);
    };
    __decorate([
        metadata_1.Input()
    ], UserInfoComponent.prototype, "username", void 0);
    __decorate([
        metadata_1.Input()
    ], UserInfoComponent.prototype, "email", void 0);
    __decorate([
        metadata_1.Input()
    ], UserInfoComponent.prototype, "accountType", void 0);
    __decorate([
        metadata_1.Input()
    ], UserInfoComponent.prototype, "address", void 0);
    __decorate([
        metadata_1.Input()
    ], UserInfoComponent.prototype, "contactNumber", void 0);
    __decorate([
        metadata_1.Input()
    ], UserInfoComponent.prototype, "id", void 0);
    __decorate([
        metadata_1.Output()
    ], UserInfoComponent.prototype, "deleteUserEvent", void 0);
    UserInfoComponent = __decorate([
        metadata_1.Component({
            selector: 'user-info',
            templateUrl: '/templates/adminTemplates/userInfo.html',
            providers: []
        })
    ], UserInfoComponent);
    return UserInfoComponent;
}());
exports.UserInfoComponent = UserInfoComponent;
