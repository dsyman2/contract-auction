System.register(["angular2/src/core/metadata", "angular2/src/http/url_search_params", "angular2/src/core/di/decorators", "angular2/http", "./userInfo.component.js", "angular2/src/http/base_request_options", "angular2/src/http/headers"], function(exports_1, context_1) {
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
    var metadata_1, url_search_params_1, decorators_1, http_1, userInfo_component_js_1, base_request_options_1, headers_1;
    var UserManagementComponent;
    return {
        setters:[
            function (metadata_1_1) {
                metadata_1 = metadata_1_1;
            },
            function (url_search_params_1_1) {
                url_search_params_1 = url_search_params_1_1;
            },
            function (decorators_1_1) {
                decorators_1 = decorators_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (userInfo_component_js_1_1) {
                userInfo_component_js_1 = userInfo_component_js_1_1;
            },
            function (base_request_options_1_1) {
                base_request_options_1 = base_request_options_1_1;
            },
            function (headers_1_1) {
                headers_1 = headers_1_1;
            }],
        execute: function() {
            /**
             * Created by Umar on 01/03/2017.
             */
            UserManagementComponent = (function () {
                function UserManagementComponent(http) {
                    this.http = http;
                    this.filterSettings = 'All';
                    this.options = new base_request_options_1.RequestOptions({ headers: new headers_1.Headers({ 'Content-Type': 'application/json' }) });
                    this.hasDeleted = undefined;
                    this.getAllUsers();
                }
                UserManagementComponent.prototype.getAllUsers = function () {
                    var _this = this;
                    return this.http.get('/allUserDetails', {})
                        .subscribe(function (usersList) { return _this.usersList = usersList.json(); }, function () { return console.log('hi' + _this.usersList); });
                };
                UserManagementComponent.prototype.onDeleteUserEvent = function (userID) {
                    var _this = this;
                    console.log('hello event');
                    var params = new url_search_params_1.URLSearchParams();
                    params.set("userID", userID);
                    this.options.search = params;
                    return this.http.get('/deleteUser', this.options)
                        .subscribe(function (result) { return _this.hasDeleted = result.json(); }, function () { return console.log('hasChanged : ' + _this.hasDeleted); }, function () { return _this.getAllUsers(); });
                };
                UserManagementComponent = __decorate([
                    metadata_1.Component({
                        selector: 'user-management-app',
                        templateUrl: '/templates/adminTemplates/userManagement.html',
                        providers: [http_1.HTTP_PROVIDERS],
                        directives: [userInfo_component_js_1.UserInfoComponent]
                    }),
                    __param(0, decorators_1.Inject(http_1.Http)), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], UserManagementComponent);
                return UserManagementComponent;
            }());
            exports_1("UserManagementComponent", UserManagementComponent);
        }
    }
});
//# sourceMappingURL=userManagement.component.js.map