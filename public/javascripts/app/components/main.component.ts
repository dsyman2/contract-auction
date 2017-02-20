/**
 * Created by Umar on 13/02/2017.
 */
import {Component} from 'angular2/core';
import {AuctionHolderComponent} from "./auctionComponents/auctionHolder.component.js";
import {ResultHolderComponent} from "./resultComponents/resultHolder.component.js";
import {Input} from "angular2/src/core/metadata";
import {NavbarComponent} from "./navbar.component.js";
import {UnresolvedHolderComponent} from "./unresolvedComponents/unresolvedHolder.component.js";
import { Notifications } from '../notifications/notifications.component.js';
import {NotificationsService} from "../notifications/notifications.service.js";
import {Notification} from "../notifications/notifications.model.js";
import {ROUTER_DIRECTIVES} from "angular2/router";
import {Inject} from "angular2/src/core/di/decorators";


/* component in angular2 */
@Component({
    selector: 'main-holder',
    templateUrl: '/templates/main.html',
    directives: [AuctionHolderComponent, ResultHolderComponent, NavbarComponent,
        UnresolvedHolderComponent, Notifications, ROUTER_DIRECTIVES]
})

export class MainComponent {
    @Input()user;
    buttonClickVal : string = "auctions";

    constructor(@Inject(NotificationsService)private _notes: NotificationsService) {
        console.log('hi');
    }

    ngOnInit(){
        //console.log("u" + this.user);
        this.user = localStorage.getItem('username');
        //this.throwPushNotification('hi everyone you');
    }

    onMenuChoice(optionPicked : string){
        console.log('hi: ' + optionPicked);
        this.buttonClickVal = optionPicked;
    }

    throwPushNotification(message: string){
        this._notes.add(new Notification('error', message));
    }
}