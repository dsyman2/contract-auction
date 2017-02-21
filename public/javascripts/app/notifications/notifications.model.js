"use strict";
/**
 * Created by Umar on 18/02/2017.
 */
var Notification = (function () {
    function Notification(type, message) {
        if (type === void 0) { type = ''; }
        if (message === void 0) { message = ''; }
        this.type = type;
        this.message = message;
    }
    return Notification;
}());
exports.Notification = Notification;
