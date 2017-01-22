"use strict";
/**
 * Created by Umar on 11/01/2017.
 */
var browser_1 = require('angular2/platform/browser');
var app_component_js_1 = require('./app.component.js');
var message_component_js_1 = require("./message.component.js");
var createAuction_component_js_1 = require("./createAuction.component.js");
browser_1.bootstrap(app_component_js_1.AppComponent);
browser_1.bootstrap(message_component_js_1.MessageComponent);
browser_1.bootstrap(createAuction_component_js_1.CreateAuctionComponent);
