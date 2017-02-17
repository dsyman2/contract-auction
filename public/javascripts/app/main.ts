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

//bootstrap(MessageComponent);
bootstrap(CreateAuctionComponent, [ValidatorService]);
//bootstrap(AuctionHolderComponent);
/*bootstrap(NavbarComponent);*/
//bootstrap(ResultHolderComponent);
bootstrap(MainComponent);