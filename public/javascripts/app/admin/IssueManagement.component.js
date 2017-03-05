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
 * Created by Umar on 05/03/2017.
 */
var metadata_1 = require("angular2/src/core/metadata");
var decorators_1 = require("angular2/src/core/di/decorators");
var http_1 = require("angular2/http");
var IssueManagementComponent = (function () {
    function IssueManagementComponent(http) {
        this.http = http;
        this.getSuspiciousUsers();
    }
    IssueManagementComponent.prototype.getSuspiciousUsers = function () {
        var _this = this;
        return this.http.get('/getSuspiciousUsers', {})
            .subscribe(function (suspiciousUsers) { return _this.suspiciousUsers = suspiciousUsers.json(); }, function () { return console.log('hi'); }, function () { return _this.suspUsers = Object.keys(_this.suspiciousUsers); });
    };
    IssueManagementComponent = __decorate([
        metadata_1.Component({
            selector: 'issue-management-app',
            templateUrl: '/templates/adminTemplates/issueManagement.html',
            providers: [http_1.HTTP_PROVIDERS]
        }),
        __param(0, decorators_1.Inject(http_1.Http))
    ], IssueManagementComponent);
    return IssueManagementComponent;
}());
exports.IssueManagementComponent = IssueManagementComponent;
