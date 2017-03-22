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
var core_1 = require('angular2/core');
var common_1 = require("angular2/common");
var validator_service_js_1 = require("../services/validator.service.js");
var http_1 = require("angular2/http");
var decorators_1 = require("angular2/src/core/di/decorators");
var url_search_params_1 = require("angular2/src/http/url_search_params");
var base_request_options_1 = require("angular2/src/http/base_request_options");
var globals = require('../config/globals.js');
/**
 * Class holds the form inputs for profiles
 */
var FormInputs = (function () {
    function FormInputs() {
        this.email = "";
        this.contactNumber = "";
    }
    return FormInputs;
}());
var ProfileUpdaterComponent = (function () {
    function ProfileUpdaterComponent(validatorService, fb, http) {
        this.http = http;
        this.options = new base_request_options_1.RequestOptions({ headers: new http_1.Headers({ 'Content-Type': 'application/json' }) });
        this.hasUpdated = undefined;
        this.formInputs = new FormInputs();
        this.CreateGroup = fb.group({
            'email': new common_1.Control(this.formInputs.email, common_1.Validators.compose([common_1.Validators.required,
                validatorService.isValidEmailFormat])),
            'contactNumber': new common_1.Control(this.formInputs.contactNumber, common_1.Validators.compose([common_1.Validators.required,
                validatorService.isInteger, validatorService.isPhoneNumberLength]))
        });
        this.getProfileDetails();
    }
    /**
     * Sets up the profile data to be displayed
     */
    ProfileUpdaterComponent.prototype.setProfileDetailsForDisplay = function () {
        this.username = this.details.username;
        this.email = this.details.email;
        this.contactNumber = this.details.contactNumber;
        this.accountType = this.details.accountType;
    };
    /**
     * Gets the user specif profile data
     * @returns {Subscription<Response>}
     */
    ProfileUpdaterComponent.prototype.getProfileDetails = function () {
        var _this = this;
        var params = new url_search_params_1.URLSearchParams();
        params.set("id", globals.userID);
        this.options.search = params;
        return this.http.get('/contactDetails', this.options)
            .subscribe(function (details) { return _this.details = details.json(); }, function () { return console.log(_this.details.username); }, function () { return _this.setProfileDetailsForDisplay(); });
    };
    /**
     * Makes get request to update user profile data, withe
     * form inputs
     * @param formInputs
     * @returns {Subscription<Response>}
     */
    ProfileUpdaterComponent.prototype.updateProfile = function (formInputs) {
        var _this = this;
        this.formInputs = new FormInputs();
        var params = new url_search_params_1.URLSearchParams();
        params.set("email", formInputs.email);
        params.set("contactNumber", formInputs.contactNumber);
        this.options.search = params;
        return this.http.get('/updateProfile', this.options)
            .subscribe(function (result) { return _this.hasUpdated = result.json(); }, function () { return _this.getProfileDetails(); });
    };
    ProfileUpdaterComponent = __decorate([
        core_1.Component({
            selector: 'profile',
            templateUrl: '/templates/profile.html',
            directives: [common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES],
            providers: [validator_service_js_1.ValidatorService, http_1.HTTP_PROVIDERS]
        }),
        __param(0, decorators_1.Inject(validator_service_js_1.ValidatorService)),
        __param(1, decorators_1.Inject(common_1.FormBuilder)),
        __param(2, decorators_1.Inject(http_1.Http))
    ], ProfileUpdaterComponent);
    return ProfileUpdaterComponent;
}());
exports.ProfileUpdaterComponent = ProfileUpdaterComponent;
