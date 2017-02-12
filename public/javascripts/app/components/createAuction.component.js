///<reference path="../../../../node_modules/rxjs/Observable.d.ts"/>
/**
 * Created by Umar on 20/01/2017.
 */
System.register(['angular2/core', 'angular2/common', "angular2/src/core/di/decorators", 'angular2/http', 'rxjs/Rx', 'rxjs/add/operator/first', "../services/validator.service.js"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, common_1, decorators_1, http_1, validator_service_js_1;
    var FormInputs, CreateAuctionComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (decorators_1_1) {
                decorators_1 = decorators_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {},
            function (_2) {},
            function (validator_service_js_1_1) {
                validator_service_js_1 = validator_service_js_1_1;
            }],
        execute: function() {
            FormInputs = (function () {
                function FormInputs() {
                }
                return FormInputs;
            }());
            CreateAuctionComponent = (function () {
                function CreateAuctionComponent(validatorService, fb, http) {
                    this.http = http;
                    // http: Http;
                    this.numberValidity = null;
                    this.formInputs = new FormInputs();
                    this.CreateGroup = fb.group({
                        'auctionName': new common_1.Control(this.formInputs.auctionName, common_1.Validators.required),
                        'auctionDesc': new common_1.Control(this.formInputs.auctionDesc, common_1.Validators.required),
                        'length': new common_1.Control(this.formInputs.length, common_1.Validators.compose([common_1.Validators.required, validatorService.isInteger])),
                        'protocol': new common_1.Control(this.formInputs.protocol, common_1.Validators.required)
                    });
                }
                CreateAuctionComponent.prototype.addNewGroup = function (formInputs) {
                    this.formInputs = new FormInputs();
                    var data = {
                        name: formInputs.auctionName,
                        description: formInputs.auctionDesc,
                        length: formInputs.length,
                        protocol: formInputs.protocol
                    };
                    this.addAuctionPostRequest("/createAuction", data);
                };
                /*public isInteger = (control : Control) => {
                    return this.checkIsInteger(control.value) ? null : {
                            valid: true
                        }
                };
            
                checkIsInteger(value: any) {
                    console.log((parseFloat(value) == parseInt(value)) && !isNaN(value));
                    return (parseFloat(value) == parseInt(value)) && !isNaN(value);
                };*/
                /* onlyDecimalNumberKey(event) {
                     let charCode = (event.which) ? event.which : event.keyCode;
                     if (charCode != 46 && charCode > 31
                         && (charCode < 48 || charCode > 57))
                         this.numberValidity = null;
                     this.numberValidity = true;
                 }
             
                 isNumberValid = (control : Control) => {
                     this.numberValidity ? null : {
                             valid: true
                         }
                 };*/
                CreateAuctionComponent.prototype.addAuctionPostRequest = function (url, data) {
                    console.log("auction name: " + data.auctionName);
                    this.headers = new http_1.Headers();
                    this.headers.append('Content-Type', 'application/json');
                    var body = JSON.stringify(data);
                    this.http.post(url, body, { headers: this.headers })
                        .map(function (res) { return (res.json()); }).subscribe();
                };
                CreateAuctionComponent = __decorate([
                    core_1.Component({
                        selector: 'createAuction-app',
                        templateUrl: '/templates/createAuction.html',
                        directives: [common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES],
                        providers: [validator_service_js_1.ValidatorService, http_1.HTTP_PROVIDERS]
                    }),
                    __param(0, decorators_1.Inject(validator_service_js_1.ValidatorService)),
                    __param(1, decorators_1.Inject(common_1.FormBuilder)),
                    __param(2, decorators_1.Inject(http_1.Http)), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof validator_service_js_1.ValidatorService !== 'undefined' && validator_service_js_1.ValidatorService) === 'function' && _a) || Object, common_1.FormBuilder, http_1.Http])
                ], CreateAuctionComponent);
                return CreateAuctionComponent;
                var _a;
            }());
            exports_1("CreateAuctionComponent", CreateAuctionComponent);
        }
    }
});
//# sourceMappingURL=createAuction.component.js.map