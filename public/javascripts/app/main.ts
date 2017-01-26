/**
 * Created by Umar on 11/01/2017.
 */
import {bootstrap}    from 'angular2/platform/browser'
import {AppComponent} from './app.component.js'
import {MessageComponent} from "./message.component.js";
import { HTTP_PROVIDERS} from 'angular2/http';
import {CreateAuctionComponent} from "./createAuction.component.js";

bootstrap(AppComponent);
bootstrap(MessageComponent);
bootstrap(CreateAuctionComponent, [HTTP_PROVIDERS]);