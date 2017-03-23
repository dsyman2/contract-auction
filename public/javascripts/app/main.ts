/**
 * Created by Umar on 11/01/2017.
 */
import {bootstrap}    from 'angular2/platform/browser'
import {CreateAuctionComponent} from "./components/auctionComponents/createAuction.component.js";
import {ValidatorService} from "./services/validator.service.js";
import {NavbarComponent} from "./components/navbar.component.js";
import {MainComponent} from "./components/main.component.js";
import {NotificationsService} from "./notifications/notifications.service.js";
import {ROUTER_PROVIDERS} from "angular2/src/router/router_providers";
import {enableProdMode} from "angular2/src/facade/lang";
import {AdminAppComponent} from "./admin/adminApp.component.js";

enableProdMode();

bootstrap(CreateAuctionComponent, [ValidatorService]);
bootstrap(MainComponent, [NotificationsService, ROUTER_PROVIDERS]);
