"use strict";
/**
 * Created by Umar on 11/01/2017.
 */
var browser_1 = require('angular2/platform/browser');
var createAuction_component_js_1 = require("./components/createAuction.component.js");
var auctionHolder_component_js_1 = require("./components/auctionHolder.component.js");
var validator_service_js_1 = require("./services/validator.service.js");
var navbar_component_js_1 = require("./components/navbar.component.js");
//bootstrap(MessageComponent);
browser_1.bootstrap(createAuction_component_js_1.CreateAuctionComponent, [validator_service_js_1.ValidatorService]);
browser_1.bootstrap(auctionHolder_component_js_1.AuctionHolderComponent);
browser_1.bootstrap(navbar_component_js_1.NavbarComponent);
