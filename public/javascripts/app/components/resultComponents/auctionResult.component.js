System.register(['angular2/core', "angular2/src/core/metadata", "angular2/http", "angular2/src/http/base_request_options", "angular2/src/http/url_search_params", "angular2/src/http/http", "angular2/src/core/di/decorators", "angular2/src/http/headers"], function(exports_1, context_1) {
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
    var core_1, metadata_1, http_1, base_request_options_1, url_search_params_1, http_2, decorators_1, headers_1;
    var AuctionResultComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (metadata_1_1) {
                metadata_1 = metadata_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (base_request_options_1_1) {
                base_request_options_1 = base_request_options_1_1;
            },
            function (url_search_params_1_1) {
                url_search_params_1 = url_search_params_1_1;
            },
            function (http_2_1) {
                http_2 = http_2_1;
            },
            function (decorators_1_1) {
                decorators_1 = decorators_1_1;
            },
            function (headers_1_1) {
                headers_1 = headers_1_1;
            }],
        execute: function() {
            AuctionResultComponent = (function () {
                function AuctionResultComponent(http) {
                    this.http = http;
                    this.options = new base_request_options_1.RequestOptions({ headers: new headers_1.Headers({ 'Content-Type': 'application/json' }) });
                    this.resultView = false;
                }
                AuctionResultComponent.prototype.ngOnInit = function () {
                    console.log(this.protocol);
                    this.getContactsByID(this.winner);
                };
                AuctionResultComponent.prototype.updateRes = function () {
                    this.resultView = true;
                    this.contactUsername = this.details.username;
                    this.contactEmail = this.details.email;
                    this.contactNum = this.details.contactNumber;
                };
                AuctionResultComponent.prototype.getContactsByID = function (id) {
                    var _this = this;
                    var params = new url_search_params_1.URLSearchParams();
                    params.set("id", id);
                    this.options.search = params;
                    return this.http.get('/contactDetails', this.options)
                        .subscribe(function (details) { return _this.details = details.json(); }, function () { return console.log('hi' + _this.details); }, function () { return console.log('lol'); });
                };
                __decorate([
                    metadata_1.Input(), 
                    __metadata('design:type', String)
                ], AuctionResultComponent.prototype, "result", void 0);
                __decorate([
                    metadata_1.Input(), 
                    __metadata('design:type', String)
                ], AuctionResultComponent.prototype, "id", void 0);
                __decorate([
                    metadata_1.Input(), 
                    __metadata('design:type', String)
                ], AuctionResultComponent.prototype, "aucID", void 0);
                __decorate([
                    metadata_1.Input(), 
                    __metadata('design:type', String)
                ], AuctionResultComponent.prototype, "name", void 0);
                __decorate([
                    metadata_1.Input(), 
                    __metadata('design:type', String)
                ], AuctionResultComponent.prototype, "desc", void 0);
                __decorate([
                    metadata_1.Input(), 
                    __metadata('design:type', String)
                ], AuctionResultComponent.prototype, "creator", void 0);
                __decorate([
                    metadata_1.Input(), 
                    __metadata('design:type', Object)
                ], AuctionResultComponent.prototype, "username", void 0);
                __decorate([
                    metadata_1.Input(), 
                    __metadata('design:type', String)
                ], AuctionResultComponent.prototype, "protocol", void 0);
                __decorate([
                    metadata_1.Input(), 
                    __metadata('design:type', String)
                ], AuctionResultComponent.prototype, "winner", void 0);
                __decorate([
                    metadata_1.Input(), 
                    __metadata('design:type', Object)
                ], AuctionResultComponent.prototype, "price", void 0);
                AuctionResultComponent = __decorate([
                    core_1.Component({
                        selector: 'result-app',
                        templateUrl: '/templates/resultTemplates/result.html',
                        providers: [http_1.HTTP_PROVIDERS]
                    }),
                    __param(0, decorators_1.Inject(http_2.Http)), 
                    __metadata('design:paramtypes', [http_2.Http])
                ], AuctionResultComponent);
                return AuctionResultComponent;
            }());
            exports_1("AuctionResultComponent", AuctionResultComponent);
        }
    }
});
//# sourceMappingURL=auctionResult.component.js.map