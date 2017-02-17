/**
 * Created by Umar on 13/02/2017.
 */
import {Component} from 'angular2/core';
import {AuctionHolderComponent} from "./auctionComponents/auctionHolder.component.js";
import {ResultHolderComponent} from "./resultComponents/resultHolder.component.js";
import {Input} from "angular2/src/core/metadata";
import {NavbarComponent} from "./navbar.component.js";
import {UnresolvedHolderComponent} from "./unresolvedComponents/unresolvedHolder.component.js";


/* component in angular2 */
@Component({
    selector: 'main-holder',
    templateUrl: '/templates/main.html',
    directives: [AuctionHolderComponent, ResultHolderComponent, NavbarComponent, UnresolvedHolderComponent]
})

export class MainComponent {
    @Input()user;
    buttonClickVal : string = "auctions";

    ngOnInit(){
        //console.log("u" + this.user);
        this.user = localStorage.getItem('username');
    }

    onMenuChoice(optionPicked : string){
        console.log('hi: ' + optionPicked);
        this.buttonClickVal = optionPicked;
    }
}