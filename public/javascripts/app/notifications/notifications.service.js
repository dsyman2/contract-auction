"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Created by Umar on 18/02/2017.
 */
var core_1 = require('angular2/core');
var Subject_1 = require('rxjs/Subject');
var Observable_1 = require('rxjs/Observable');
var NotificationsService = (function () {
    function NotificationsService() {
        var _this = this;
        this._notifications = new Subject_1.Subject();
        //public noteAdded = this._notifications;
        this.noteAdded = new Observable_1.Observable(function (fn) { return _this._notifications._subscribe(fn); });
    }
    /* public getNoteAdded(){
         return asObservable(this._notifications)
     }*/
    NotificationsService.prototype.add = function (notification) {
        this._notifications.next(notification);
    };
    NotificationsService = __decorate([
        core_1.Injectable()
    ], NotificationsService);
    return NotificationsService;
}());
exports.NotificationsService = NotificationsService;
