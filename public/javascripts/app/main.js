"use strict";
/**
 * Created by Umar on 11/01/2017.
 */
var browser_1 = require('angular2/platform/browser');
var createAuction_component_js_1 = require("./components/auctionComponents/createAuction.component.js");
//import {AuctionHolderComponent} from "./components/auctionHolder.component.js";
var validator_service_js_1 = require("./services/validator.service.js");
//import {ResultHolderComponent} from "./components/resultHolder.component.js";
var main_component_js_1 = require("./components/main.component.js");
var notifications_service_js_1 = require("./notifications/notifications.service.js");
var router_providers_1 = require("angular2/src/router/router_providers");
var lang_1 = require("angular2/src/facade/lang");
lang_1.enableProdMode();
//bootstrap(MessageComponent);
browser_1.bootstrap(createAuction_component_js_1.CreateAuctionComponent, [validator_service_js_1.ValidatorService]);
//bootstrap(AuctionHolderComponent);
/*bootstrap(NavbarComponent);*/
//bootstrap(ResultHolderComponent);
browser_1.bootstrap(main_component_js_1.MainComponent, [notifications_service_js_1.NotificationsService, router_providers_1.ROUTER_PROVIDERS]);
