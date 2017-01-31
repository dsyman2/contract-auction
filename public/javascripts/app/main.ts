/**
 * Created by Umar on 11/01/2017.
 */
import {bootstrap}    from 'angular2/platform/browser'
import {MessageComponent} from "./message.component.js";
import { HTTP_PROVIDERS} from 'angular2/http';
import {CreateAuctionComponent} from "./createAuction.component.js";
import {AuctionHolderComponent} from "./auctionHolder.component.js";

bootstrap(MessageComponent);
bootstrap(CreateAuctionComponent, [HTTP_PROVIDERS]);
bootstrap(AuctionHolderComponent);