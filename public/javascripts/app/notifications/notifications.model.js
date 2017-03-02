"use strict";
/**
 * Created by Umar on 18/02/2017.
 */
var Notification = (function () {
    function Notification(message) {
        if (message === void 0) { message = ''; }
        this.message = message;
    }
    return Notification;
}());
exports.Notification = Notification;
