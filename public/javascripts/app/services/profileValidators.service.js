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
 * Created by Umar on 20/02/2017.
 */
var decorators_1 = require("angular2/src/core/di/decorators");
var http_1 = require("angular2/src/http/http");
var url_search_params_1 = require("angular2/src/http/url_search_params");
var ProfileValidatorsService = (function () {
    function ProfileValidatorsService(http) {
        this.http = http;
        this.isNotUsed = function (control) {
            return isNotUsed(control.value) ? null : {
                valid: true
            };
        };
    }
    ProfileValidatorsService = __decorate([
        decorators_1.Injectable(),
        __param(0, decorators_1.Inject(http_1.Http))
    ], ProfileValidatorsService);
    return ProfileValidatorsService;
}());
exports.ProfileValidatorsService = ProfileValidatorsService;
function isNotUsed(value) {
    var _this = this;
    var params = new url_search_params_1.URLSearchParams();
    params.set("value", value);
    this.options.search = params;
    return this.http.get('/contactDetails', this.options)
        .subscribe(function (details) { return _this.details = details.json(); }, function () { return console.log('hi' + _this.details); }, function () { return console.log('lol'); });
}
