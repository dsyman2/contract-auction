/**
 * Created by Umar on 29/01/2017.
 */
import {Component} from 'angular2/core';
import {Output} from "angular2/src/core/metadata";
import {EventEmitter} from "angular2/src/facade/async";
import globalVars = require('../config/globals.js');


/* component in angular2 */
@Component({
    selector: 'navbar',
    templateUrl: '/templates/navbar.html',

})

/**
 * Component for the navbar, it holds all data associated with it
 */
export class NavbarComponent {

    @Output() buttonChoice: EventEmitter<string> = new EventEmitter<string>();
    auctions : string = 'auctions';
    myAuctions : string = 'myAuctions';
    unresolved : string = 'unresolved';
    profile : string = 'profile';
    issues : string = 'issues';
    usersPage : string = 'usersPage';
    clickValue : string = this.auctions;
    accountType : string;

    /**
     * On initialising do... instead of constructor so data can be passed in
     */
    ngOnInit(){
        this.accountType = globalVars.accountType;
    }

    /**
     * Sets the menu selected option to the option in the parameter
     * @param option
     */
    setMenuOption(option : string){
        this.clickValue = option;
        this.buttonChoice.emit(option);
    }
}