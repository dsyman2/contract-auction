"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Created by Umar on 04/02/2017.
 */
var decorators_1 = require("angular2/src/core/di/decorators");
/**
 * Validator service is used to validate user input throughout
 */
var ValidatorService = (function () {
    function ValidatorService() {
        this.isInteger = function (control) {
            return checkIsInteger(control.value) ? null : {
                valid: true
            };
        };
        this.isFloat = function (control) {
            return checkIsFloat(control.value) ? null : {
                valid: true
            };
        };
        this.isNotZero = function (control) {
            return checkIsZero(control.value) ? null : {
                valid: true
            };
        };
        this.isValidEmailFormat = function (control) {
            return isValidEmailFormat(control.value) ? null : {
                valid: true
            };
        };
        this.isPhoneNumberLength = function (control) {
            return isPhoneNumberLength(control.value) ? null : {
                valid: true
            };
        };
    }
    ValidatorService.prototype.isIntegerPrice = function (protocol) {
        return function (control) {
            return checkIsIntegerPrice(control.value, protocol) ? null : {
                valid: true
            };
        };
    };
    ValidatorService.prototype.isNotZeroPrice = function (protocol) {
        return function (control) {
            return checkIsZeroPrice(control.value, protocol) ? null : {
                valid: true
            };
        };
    };
    ValidatorService = __decorate([
        decorators_1.Injectable()
    ], ValidatorService);
    return ValidatorService;
}());
exports.ValidatorService = ValidatorService;
function checkIsInteger(value) {
    return (parseFloat(value) == parseInt(value)) && !isNaN(value);
}
function checkIsFloat(value) {
    return (parseFloat(value) == parseFloat(value)) && !isNaN(value);
}
function checkIsZero(value) {
    return (parseInt(value) > 0);
}
function checkIsIntegerPrice(value, protocol) {
    if (protocol == 'English' || protocol == 'Dutch') {
        return (parseFloat(value) == parseInt(value)) && !isNaN(value);
    }
    return (parseFloat('1') == parseInt('1')) && !isNaN(1);
}
function checkIsZeroPrice(value, protocol) {
    if (protocol == 'English' || protocol == 'Dutch') {
        return (value > 0);
    }
    return (parseFloat('1') == parseInt('1')) && !isNaN(1);
}
function isValidEmailFormat(value) {
    // RFC 2822 compliant regex
    if (value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
        return true;
    }
    return null;
}
function isPhoneNumberLength(value) {
    if (value.length > 10) {
        return true;
    }
    return null;
}
