/**
 * Created by Umar on 11/01/2017.
 */
import {bootstrap}    from 'angular2/platform/browser'
import {MessageComponent} from "./components/message.component.js";
import { HTTP_PROVIDERS} from 'angular2/http';
import {CreateAuctionComponent} from "./components/createAuction.component.js";
import {AuctionHolderComponent} from "./components/auctionHolder.component.js";
import {ValidatorService} from "./services/validator.service.js";
import {NavbarComponent} from "./components/navbar.component.js";

//bootstrap(MessageComponent);
bootstrap(CreateAuctionComponent, [ValidatorService]);
bootstrap(AuctionHolderComponent);
bootstrap(NavbarComponent);