System.register(['angular2/core', 'rxjs/Rx', "angular2/http", "angular2/src/core/di/decorators", '../../config/globals.js', "./auctionResult.component.js"], function(exports_1, context_1) {
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
    var core_1, http_1, decorators_1, globals, auctionResult_component_js_1;
    var ResultHolderComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (_1) {},
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (decorators_1_1) {
                decorators_1 = decorators_1_1;
            },
            function (globals_1) {
                globals = globals_1;
            },
            function (auctionResult_component_js_1_1) {
                auctionResult_component_js_1 = auctionResult_component_js_1_1;
            }],
        execute: function() {
            ResultHolderComponent = (function () {
                function ResultHolderComponent(http) {
                    this.http = http;
                    this.won = false;
                    this.createdB = false;
                    this.getCreatedAucResults();
                    this.getWonAucResults();
                }
                ResultHolderComponent.prototype.ngOnInit = function () {
                    this.accountType = globals.accountType;
                };
                ResultHolderComponent.prototype.getCreatedAucResults = function () {
                    var _this = this;
                    this.http.get("/completedAuctions", {})
                        .subscribe(function (createdList) { return _this.createdList = createdList.json(); }, function () { return console.log(_this.createdList); }, function () { return _this.createdB = true; });
                };
                ResultHolderComponent.prototype.getWonAucResults = function () {
                    var _this = this;
                    this.http.get("/wonAuctions", {})
                        .subscribe(function (wonList) { return _this.wonList = wonList.json(); }, function () { return console.log(_this.wonList); }, function () { return _this.won = true; });
                };
                ResultHolderComponent = __decorate([
                    core_1.Component({
                        selector: 'result-holder',
                        templateUrl: '/templates/resultTemplates/resultHolder.html',
                        providers: [http_1.HTTP_PROVIDERS],
                        directives: [auctionResult_component_js_1.AuctionResultComponent]
                    }),
                    __param(0, decorators_1.Inject(http_1.Http)), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], ResultHolderComponent);
                return ResultHolderComponent;
            }());
            exports_1("ResultHolderComponent", ResultHolderComponent);
        }
    }
});
//# sourceMappingURL=resultHolder.component.js.map