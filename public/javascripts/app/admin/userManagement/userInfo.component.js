System.register(["angular2/src/core/metadata", "angular2/src/facade/async"], function(exports_1, context_1) {
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
    var metadata_1, async_1;
    var UserInfoComponent;
    return {
        setters:[
            function (metadata_1_1) {
                metadata_1 = metadata_1_1;
            },
            function (async_1_1) {
                async_1 = async_1_1;
            }],
        execute: function() {
            /**
             * Created by Umar on 01/03/2017.
             */
            UserInfoComponent = (function () {
                function UserInfoComponent() {
                    this.deleteUserEvent = new async_1.EventEmitter();
                }
                UserInfoComponent.prototype.sendDelete = function () {
                    this.deleteUserEvent.emit(this.id);
                };
                __decorate([
                    metadata_1.Input(), 
                    __metadata('design:type', String)
                ], UserInfoComponent.prototype, "username", void 0);
                __decorate([
                    metadata_1.Input(), 
                    __metadata('design:type', String)
                ], UserInfoComponent.prototype, "email", void 0);
                __decorate([
                    metadata_1.Input(), 
                    __metadata('design:type', String)
                ], UserInfoComponent.prototype, "accountType", void 0);
                __decorate([
                    metadata_1.Input(), 
                    __metadata('design:type', String)
                ], UserInfoComponent.prototype, "address", void 0);
                __decorate([
                    metadata_1.Input(), 
                    __metadata('design:type', String)
                ], UserInfoComponent.prototype, "contactNumber", void 0);
                __decorate([
                    metadata_1.Input(), 
                    __metadata('design:type', String)
                ], UserInfoComponent.prototype, "id", void 0);
                __decorate([
                    metadata_1.Output(), 
                    __metadata('design:type', async_1.EventEmitter)
                ], UserInfoComponent.prototype, "deleteUserEvent", void 0);
                UserInfoComponent = __decorate([
                    metadata_1.Component({
                        selector: 'user-info',
                        templateUrl: '/templates/adminTemplates/userInfo.html',
                        providers: []
                    }), 
                    __metadata('design:paramtypes', [])
                ], UserInfoComponent);
                return UserInfoComponent;
            }());
            exports_1("UserInfoComponent", UserInfoComponent);
        }
    }
});
//# sourceMappingURL=userInfo.component.js.map