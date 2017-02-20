System.register(['angular2/core', './auctionApp.component.js', "angular2/src/core/metadata", "angular2/src/facade/async"], function(exports_1, context_1) {
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
    var core_1, auctionApp_component_js_1, metadata_1, async_1;
    var AuctionHolderComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (auctionApp_component_js_1_1) {
                auctionApp_component_js_1 = auctionApp_component_js_1_1;
            },
            function (metadata_1_1) {
                metadata_1 = metadata_1_1;
            },
            function (async_1_1) {
                async_1 = async_1_1;
            }],
        execute: function() {
            /* component in angular2 */
            AuctionHolderComponent = (function () {
                function AuctionHolderComponent() {
                    this.auctions = {};
                    this.socket = null;
                    this.pushNotifToMain = new async_1.EventEmitter();
                }
                AuctionHolderComponent.prototype.ngOnInit = function () {
                    //console.log("u" + this.user);
                    this.user = localStorage.getItem('username');
                    this.socket = io('http://localhost:8000');
                    //this.socket = io('http://ec2-52-56-141-53.eu-west-2.compute.amazonaws.com:8000')
                    this.socket.on('auctionList', function (data) {
                        this.auctions = data;
                        console.log(this.auctions);
                        this.arrayOfAucs = Object.keys(this.auctions);
                    }.bind(this));
                    console.log(this.arrayOfAucs);
                };
                AuctionHolderComponent.prototype.onPushNotif = function (notif) {
                    this.pushNotifToMain.emit(notif);
                };
                __decorate([
                    metadata_1.Input(), 
                    __metadata('design:type', Object)
                ], AuctionHolderComponent.prototype, "user", void 0);
                __decorate([
                    metadata_1.Output(), 
                    __metadata('design:type', async_1.EventEmitter)
                ], AuctionHolderComponent.prototype, "pushNotifToMain", void 0);
                AuctionHolderComponent = __decorate([
                    core_1.Component({
                        selector: 'auction-holder',
                        templateUrl: '/templates/auctionTemplates/auctionHolder.html',
                        directives: [auctionApp_component_js_1.AuctionAppComponent]
                    }), 
                    __metadata('design:paramtypes', [])
                ], AuctionHolderComponent);
                return AuctionHolderComponent;
            }());
            exports_1("AuctionHolderComponent", AuctionHolderComponent);
        }
    }
});
//# sourceMappingURL=auctionHolder.component.js.map