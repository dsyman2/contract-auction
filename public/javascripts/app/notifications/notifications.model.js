System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Notification;
    return {
        setters:[],
        execute: function() {
            /**
             * Created by Umar on 18/02/2017.
             */
            Notification = (function () {
                function Notification(type, message) {
                    if (type === void 0) { type = ''; }
                    if (message === void 0) { message = ''; }
                    this.type = type;
                    this.message = message;
                }
                return Notification;
            }());
            exports_1("Notification", Notification);
        }
    }
});
//# sourceMappingURL=notifications.model.js.map