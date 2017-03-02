System.register(['angular2/core', "./auctionComponents/auctionHolder.component.js", "./resultComponents/resultHolder.component.js", "angular2/src/core/metadata", "./navbar.component.js", "./unresolvedComponents/unresolvedHolder.component.js", '../notifications/notifications.component.js', "../notifications/notifications.service.js", "angular2/router", "angular2/src/core/di/decorators", "./profileUpdater.component.js", "../admin/userManagement/userManagement.component.js"], function(exports_1, context_1) {
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
    var core_1, auctionHolder_component_js_1, resultHolder_component_js_1, metadata_1, navbar_component_js_1, unresolvedHolder_component_js_1, notifications_component_js_1, notifications_service_js_1, router_1, decorators_1, profileUpdater_component_js_1, userManagement_component_js_1;
    var MainComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (auctionHolder_component_js_1_1) {
                auctionHolder_component_js_1 = auctionHolder_component_js_1_1;
            },
            function (resultHolder_component_js_1_1) {
                resultHolder_component_js_1 = resultHolder_component_js_1_1;
            },
            function (metadata_1_1) {
                metadata_1 = metadata_1_1;
            },
            function (navbar_component_js_1_1) {
                navbar_component_js_1 = navbar_component_js_1_1;
            },
            function (unresolvedHolder_component_js_1_1) {
                unresolvedHolder_component_js_1 = unresolvedHolder_component_js_1_1;
            },
            function (notifications_component_js_1_1) {
                notifications_component_js_1 = notifications_component_js_1_1;
            },
            function (notifications_service_js_1_1) {
                notifications_service_js_1 = notifications_service_js_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (decorators_1_1) {
                decorators_1 = decorators_1_1;
            },
            function (profileUpdater_component_js_1_1) {
                profileUpdater_component_js_1 = profileUpdater_component_js_1_1;
            },
            function (userManagement_component_js_1_1) {
                userManagement_component_js_1 = userManagement_component_js_1_1;
            }],
        execute: function() {
            /* component in angular2 */
            MainComponent = (function () {
                function MainComponent(_notes) {
                    this._notes = _notes;
                    this.buttonClickVal = "auctions";
                    console.log('hi');
                }
                MainComponent.prototype.ngOnInit = function () {
                    console.log("u" + this.user);
                    this.user = localStorage.getItem('username');
                    this.accountType = localStorage.getItem('accountType');
                    //this.throwPushNotification('hi everyone you');
                };
                MainComponent.prototype.onMenuChoice = function (optionPicked) {
                    console.log('hi: ' + optionPicked);
                    this.buttonClickVal = optionPicked;
                };
                __decorate([
                    metadata_1.Input(), 
                    __metadata('design:type', Object)
                ], MainComponent.prototype, "user", void 0);
                __decorate([
                    metadata_1.Input(), 
                    __metadata('design:type', Object)
                ], MainComponent.prototype, "accountType", void 0);
                MainComponent = __decorate([
                    core_1.Component({
                        selector: 'main-holder',
                        templateUrl: '/templates/main.html',
                        directives: [auctionHolder_component_js_1.AuctionHolderComponent, resultHolder_component_js_1.ResultHolderComponent, navbar_component_js_1.NavbarComponent,
                            unresolvedHolder_component_js_1.UnresolvedHolderComponent, notifications_component_js_1.Notifications, router_1.ROUTER_DIRECTIVES, profileUpdater_component_js_1.ProfileUpdaterComponent,
                            userManagement_component_js_1.UserManagementComponent]
                    }),
                    __param(0, decorators_1.Inject(notifications_service_js_1.NotificationsService)), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof notifications_service_js_1.NotificationsService !== 'undefined' && notifications_service_js_1.NotificationsService) === 'function' && _a) || Object])
                ], MainComponent);
                return MainComponent;
                var _a;
            }());
            exports_1("MainComponent", MainComponent);
        }
    }
});
//# sourceMappingURL=main.component.js.map