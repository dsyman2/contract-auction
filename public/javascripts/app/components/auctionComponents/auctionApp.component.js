System.register(['angular2/core', "angular2/src/core/metadata", './clockApp.component.js', "./message.component.js", 'angular2/http', 'rxjs/Rx', "angular2/src/core/di/decorators", 'angular2/common', "../../services/validator.service.js", '../../config/configer.js', '../../config/globals.js', "../../notifications/notifications.service.js", "../../notifications/notifications.model.js"], function(exports_1, context_1) {
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
    var core_1, metadata_1, clockApp_component_js_1, message_component_js_1, http_1, decorators_1, common_1, validator_service_js_1, config, globals, notifications_service_js_1, notifications_model_js_1;
    var FormInputs, AuctionAppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (metadata_1_1) {
                metadata_1 = metadata_1_1;
            },
            function (clockApp_component_js_1_1) {
                clockApp_component_js_1 = clockApp_component_js_1_1;
            },
            function (message_component_js_1_1) {
                message_component_js_1 = message_component_js_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {},
            function (decorators_1_1) {
                decorators_1 = decorators_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (validator_service_js_1_1) {
                validator_service_js_1 = validator_service_js_1_1;
            },
            function (config_1) {
                config = config_1;
            },
            function (globals_1) {
                globals = globals_1;
            },
            function (notifications_service_js_1_1) {
                notifications_service_js_1 = notifications_service_js_1_1;
            },
            function (notifications_model_js_1_1) {
                notifications_model_js_1 = notifications_model_js_1_1;
            }],
        execute: function() {
            FormInputs = (function () {
                function FormInputs() {
                    this.bidValue = '';
                }
                return FormInputs;
            }());
            AuctionAppComponent = (function () {
                function AuctionAppComponent(http, _notes, validatorService, fb) {
                    this.http = http;
                    this._notes = _notes;
                    this.price = 0.0;
                    this.socket = null;
                    this.bidValue = '';
                    this.time = 0;
                    this.active = true;
                    this.showNotif = false;
                    if (this.protocol != 'Dutch') {
                        this.formInputs = new FormInputs();
                        this.CreateGroup = fb.group({
                            'bidValue': new common_1.Control(this.formInputs.bidValue, common_1.Validators.compose([common_1.Validators.required,
                                validatorService.isFloat, validatorService.isNotZero]))
                        });
                    }
                }
                AuctionAppComponent.prototype.ngOnInit = function () {
                    this.accountType = globals.accountType;
                    console.log("username is:" + this.creator);
                    this.userID = globals.userID;
                    this.socket = io(config.socket_src);
                    this.socket.on('priceUpdate-' + this.id, function (data) {
                        console.log(data);
                        this.price = +parseFloat(data);
                        if (this.showNotif) {
                            this.throwPushNotification('Bid for auction: ' + this.name + '. \n Price: £' + this.price + '.');
                        }
                        console.log('hi i is hefre');
                        this.showNotif = true;
                    }.bind(this));
                    this.socket.on('auctionEnd-' + this.id, function (data) {
                        console.log('over and out: ' + data);
                    });
                };
                AuctionAppComponent.prototype.addNewGroup = function (formInputs) {
                    this.formInputs = new FormInputs();
                    var data = {
                        bidVal: formInputs.bidValue,
                    };
                    this.bidParam(data);
                };
                AuctionAppComponent.prototype.bid = function () {
                    this.showNotif = true;
                    this.socket.emit('bid-' + this.id, {
                        bid: this.bidValue,
                        bidder: this.username
                    });
                    this.bidValue = '';
                };
                AuctionAppComponent.prototype.bidParam = function (data) {
                    this.showNotif = true;
                    this.socket.emit('bid-' + this.id, {
                        bid: data.bidVal,
                        bidder: this.username
                    });
                    this.formInputs.bidValue = '';
                };
                AuctionAppComponent.prototype.onTimeUp = function (data) {
                    //alert(data);
                    this.active = false;
                };
                AuctionAppComponent.prototype.sendDelete = function () {
                    this.headers = new http_1.Headers();
                    this.headers.append('Content-Type', 'application/json');
                    var data = { id: this.id };
                    var body = JSON.stringify(data);
                    this.http.post("/deleteAuction", body, { headers: this.headers })
                        .map(function (res) { return (res.json()); }).subscribe();
                };
                AuctionAppComponent.prototype.throwPushNotification = function (message) {
                    this._notes.add(new notifications_model_js_1.Notification('error', message));
                };
                AuctionAppComponent.prototype.togglePushNotif = function () {
                    this.showNotif = !this.showNotif;
                };
                __decorate([
                    metadata_1.Input(), 
                    __metadata('design:type', Object)
                ], AuctionAppComponent.prototype, "auction", void 0);
                __decorate([
                    metadata_1.Input(), 
                    __metadata('design:type', String)
                ], AuctionAppComponent.prototype, "id", void 0);
                __decorate([
                    metadata_1.Input(), 
                    __metadata('design:type', String)
                ], AuctionAppComponent.prototype, "name", void 0);
                __decorate([
                    metadata_1.Input(), 
                    __metadata('design:type', String)
                ], AuctionAppComponent.prototype, "desc", void 0);
                __decorate([
                    metadata_1.Input(), 
                    __metadata('design:type', String)
                ], AuctionAppComponent.prototype, "creator", void 0);
                __decorate([
                    metadata_1.Input(), 
                    __metadata('design:type', Object)
                ], AuctionAppComponent.prototype, "username", void 0);
                __decorate([
                    metadata_1.Input(), 
                    __metadata('design:type', String)
                ], AuctionAppComponent.prototype, "protocol", void 0);
                __decorate([
                    metadata_1.Input(), 
                    __metadata('design:type', String)
                ], AuctionAppComponent.prototype, "contractType", void 0);
                AuctionAppComponent = __decorate([
                    core_1.Component({
                        selector: 'auction-app',
                        templateUrl: '/templates/auctionTemplates/auction.html',
                        directives: [clockApp_component_js_1.ClockAppComponent, message_component_js_1.MessageComponent, common_1.FORM_DIRECTIVES],
                        providers: [http_1.HTTP_PROVIDERS, validator_service_js_1.ValidatorService, common_1.FormBuilder]
                    }),
                    __param(0, decorators_1.Inject(http_1.Http)),
                    __param(1, decorators_1.Inject(notifications_service_js_1.NotificationsService)),
                    __param(2, decorators_1.Inject(validator_service_js_1.ValidatorService)),
                    __param(3, decorators_1.Inject(common_1.FormBuilder)), 
                    __metadata('design:paramtypes', [http_1.Http, (typeof (_a = typeof notifications_service_js_1.NotificationsService !== 'undefined' && notifications_service_js_1.NotificationsService) === 'function' && _a) || Object, (typeof (_b = typeof validator_service_js_1.ValidatorService !== 'undefined' && validator_service_js_1.ValidatorService) === 'function' && _b) || Object, common_1.FormBuilder])
                ], AuctionAppComponent);
                return AuctionAppComponent;
                var _a, _b;
            }());
            exports_1("AuctionAppComponent", AuctionAppComponent);
        }
    }
});
//# sourceMappingURL=auctionApp.component.js.map