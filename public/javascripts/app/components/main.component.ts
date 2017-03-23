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
import {ProfileUpdaterComponent} from "./profileUpdater.component.js";
import {UserManagementComponent} from "../admin/userManagement/userManagement.component.js";
import {IssueManagementComponent} from "../admin/IssueManagement.component.js";

@Component({
    selector: 'main-holder',
    templateUrl: '/templates/main.html',
    directives: [AuctionHolderComponent, ResultHolderComponent, NavbarComponent,
        UnresolvedHolderComponent, Notifications, ROUTER_DIRECTIVES, ProfileUpdaterComponent,
        UserManagementComponent, IssueManagementComponent]
})

/**
 * This component is the top level which holds all components within it
 */
export class MainComponent {
    @Input()user;
    @Input()accountType;
    buttonClickVal : string = "auctions";

    constructor(@Inject(NotificationsService)private _notes: NotificationsService) {
    }

    /**
     * On initialising do... instead of constructor so data can be passed in
     */
    ngOnInit(){
        this.user = localStorage.getItem('username');
        this.accountType = localStorage.getItem('accountType');
    }

    /**
     * Sets the menu choice with button value
     * @param optionPicked
     */
    onMenuChoice(optionPicked : string){
        this.buttonClickVal = optionPicked;
    }
}