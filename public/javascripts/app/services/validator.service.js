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
var ValidatorService = (function () {
    function ValidatorService() {
        this.isInteger = function (control) {
            return checkIsInteger(control.value) ? null : {
                valid: true
            };
        };
    }
    ValidatorService = __decorate([
        decorators_1.Injectable()
    ], ValidatorService);
    return ValidatorService;
}());
exports.ValidatorService = ValidatorService;
function checkIsInteger(value) {
    console.log((parseFloat(value) == parseInt(value)) && !isNaN(value));
    return (parseFloat(value) == parseInt(value)) && !isNaN(value);
}
