"use strict";
/**
 * Created by Umar on 11/01/2017.
 */
var browser_1 = require('angular2/platform/browser');
var message_component_js_1 = require("./message.component.js");
var http_1 = require('angular2/http');
var createAuction_component_js_1 = require("./createAuction.component.js");
var auctionHolder_component_js_1 = require("./auctionHolder.component.js");
browser_1.bootstrap(message_component_js_1.MessageComponent);
browser_1.bootstrap(createAuction_component_js_1.CreateAuctionComponent, [http_1.HTTP_PROVIDERS]);
browser_1.bootstrap(auctionHolder_component_js_1.AuctionHolderComponent);
