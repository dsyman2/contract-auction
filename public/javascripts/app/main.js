System.register(['angular2/platform/browser', "./message.component.js", 'angular2/http', "./createAuction.component.js", "./auctionHolder.component.js"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var browser_1, message_component_js_1, http_1, createAuction_component_js_1, auctionHolder_component_js_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (message_component_js_1_1) {
                message_component_js_1 = message_component_js_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (createAuction_component_js_1_1) {
                createAuction_component_js_1 = createAuction_component_js_1_1;
            },
            function (auctionHolder_component_js_1_1) {
                auctionHolder_component_js_1 = auctionHolder_component_js_1_1;
            }],
        execute: function() {
            browser_1.bootstrap(message_component_js_1.MessageComponent);
            browser_1.bootstrap(createAuction_component_js_1.CreateAuctionComponent, [http_1.HTTP_PROVIDERS]);
            browser_1.bootstrap(auctionHolder_component_js_1.AuctionHolderComponent);
        }
    }
});
//# sourceMappingURL=main.js.map