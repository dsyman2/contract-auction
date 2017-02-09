System.register(['angular2/core', "angular2/src/core/metadata", './clockApp.component.js'], function(exports_1, context_1) {
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
    var core_1, metadata_1, clockApp_component_js_1;
    var AuctionAppComponent;
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
            }],
        execute: function() {
            AuctionAppComponent = (function () {
                function AuctionAppComponent() {
                    this.price = 0.0;
                    this.socket = null;
                    this.bidValue = '';
                    this.time = 0;
                    this.active = true;
                }
                AuctionAppComponent.prototype.ngOnInit = function () {
                    console.log("username is:" + this.username);
                    this.socket = io('http://localhost:8000');
                    this.socket.on('priceUpdate-' + this.id, function (data) {
                        this.price = data;
                    }.bind(this));
                    this.socket.on('auctionEnd-' + this.id, function (data) {
                        console.log('over and out: ' + data);
                    });
                    /* this.socket.on('timeRemaining-' + this.id, function(data){
                         this.time = data;
                         console.log("Time is: " + data);
                     }.bind(this));*/
                    /* this.id = this.auction.id;
                     this.name = this.auction.name;
                     this.desc = this.auction.description;
                     this.creator = this.auction.creatorID;*/
                };
                AuctionAppComponent.prototype.bid = function () {
                    this.socket.emit('bid-' + this.id, {
                        bid: this.bidValue,
                        bidder: this.username
                    });
                    this.bidValue = '';
                };
                AuctionAppComponent.prototype.onTimeUp = function (data) {
                    //alert(data);
                    this.active = false;
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
                AuctionAppComponent = __decorate([
                    core_1.Component({
                        selector: 'auction-app',
                        templateUrl: '/templates/auction.html',
                        directives: [clockApp_component_js_1.ClockAppComponent]
                    }), 
                    __metadata('design:paramtypes', [])
                ], AuctionAppComponent);
                return AuctionAppComponent;
            }());
            exports_1("AuctionAppComponent", AuctionAppComponent);
        }
    }
});
//# sourceMappingURL=auctionApp.component.js.map