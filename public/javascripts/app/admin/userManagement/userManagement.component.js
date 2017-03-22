/**
 * Created by Umar on 01/03/2017.
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
var metadata_1 = require("angular2/src/core/metadata");
var url_search_params_1 = require("angular2/src/http/url_search_params");
var decorators_1 = require("angular2/src/core/di/decorators");
var http_1 = require("angular2/http");
var userInfo_component_js_1 = require("./userInfo.component.js");
var base_request_options_1 = require("angular2/src/http/base_request_options");
var headers_1 = require("angular2/src/http/headers");
var UserManagementComponent = (function () {
    function UserManagementComponent(http) {
        this.http = http;
        this.filterSettings = 'All';
        this.options = new base_request_options_1.RequestOptions({ headers: new headers_1.Headers({ 'Content-Type': 'application/json' }) });
        this.hasDeleted = undefined;
        this.getAllUsers();
    }
    /**
     * makes a get request to get all users in the application
     * @returns {Subscription<Response>}
     */
    UserManagementComponent.prototype.getAllUsers = function () {
        var _this = this;
        return this.http.get('/allUserDetails', {})
            .subscribe(function (usersList) { return _this.usersList = usersList.json(); });
    };
    /**
     * Deletes a user event when it receives a delete event
     * @param userID
     * @returns {Subscription<Response>}
     */
    UserManagementComponent.prototype.onDeleteUserEvent = function (userID) {
        var _this = this;
        var params = new url_search_params_1.URLSearchParams();
        params.set("userID", userID);
        this.options.search = params;
        return this.http.get('/deleteUser', this.options)
            .subscribe(function (result) { return _this.hasDeleted = result.json(); }, function () { return _this.getAllUsers(); });
    };
    UserManagementComponent = __decorate([
        metadata_1.Component({
            selector: 'user-management-app',
            templateUrl: '/templates/adminTemplates/userManagement.html',
            providers: [http_1.HTTP_PROVIDERS],
            directives: [userInfo_component_js_1.UserInfoComponent]
        }),
        __param(0, decorators_1.Inject(http_1.Http))
    ], UserManagementComponent);
    return UserManagementComponent;
}());
exports.UserManagementComponent = UserManagementComponent;
