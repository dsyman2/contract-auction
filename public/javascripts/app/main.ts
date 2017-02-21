/**
 * Created by Umar on 11/01/2017.
 */
import {bootstrap}    from 'angular2/platform/browser'
import {MessageComponent} from "./components/auctionComponents/message.component.js";
import { HTTP_PROVIDERS} from 'angular2/http';
import {CreateAuctionComponent} from "./components/auctionComponents/createAuction.component.js";
//import {AuctionHolderComponent} from "./components/auctionHolder.component.js";
import {ValidatorService} from "./services/validator.service.js";
import {NavbarComponent} from "./components/navbar.component.js";
//import {ResultHolderComponent} from "./components/resultHolder.component.js";
import {MainComponent} from "./components/main.component.js";
import {NotificationsService} from "./notifications/notifications.service.js";
import {ROUTER_PROVIDERS} from "angular2/src/router/router_providers";

//bootstrap(MessageComponent);
bootstrap(CreateAuctionComponent, [ValidatorService]);
//bootstrap(AuctionHolderComponent);
/*bootstrap(NavbarComponent);*/
//bootstrap(ResultHolderComponent);
bootstrap(MainComponent, [NotificationsService, ROUTER_PROVIDERS]);