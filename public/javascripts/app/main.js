System.register(['angular2/platform/browser', "./components/auctionComponents/createAuction.component.js", "./services/validator.service.js", "./components/main.component.js", "./notifications/notifications.service.js", "angular2/src/router/router_providers", "angular2/src/facade/lang"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var browser_1, createAuction_component_js_1, validator_service_js_1, main_component_js_1, notifications_service_js_1, router_providers_1, lang_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (createAuction_component_js_1_1) {
                createAuction_component_js_1 = createAuction_component_js_1_1;
            },
            function (validator_service_js_1_1) {
                validator_service_js_1 = validator_service_js_1_1;
            },
            function (main_component_js_1_1) {
                main_component_js_1 = main_component_js_1_1;
            },
            function (notifications_service_js_1_1) {
                notifications_service_js_1 = notifications_service_js_1_1;
            },
            function (router_providers_1_1) {
                router_providers_1 = router_providers_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
            lang_1.enableProdMode();
            //bootstrap(MessageComponent);
            browser_1.bootstrap(createAuction_component_js_1.CreateAuctionComponent, [validator_service_js_1.ValidatorService]);
            //bootstrap(AuctionHolderComponent);
            /*bootstrap(NavbarComponent);*/
            //bootstrap(ResultHolderComponent);
            browser_1.bootstrap(main_component_js_1.MainComponent, [notifications_service_js_1.NotificationsService, router_providers_1.ROUTER_PROVIDERS]);
        }
    }
});
//# sourceMappingURL=main.js.map