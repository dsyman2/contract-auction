/**
 * Created by Umar on 29/01/2017.
 */
import {Component} from 'angular2/core';
import {Output} from "angular2/src/core/metadata";
import {EventEmitter} from "angular2/src/facade/async";

/* component in angular2 */
@Component({
    selector: 'navbar',
    templateUrl: '/templates/navbar.html',

})

export class NavbarComponent {

    @Output() buttonChoice: EventEmitter<string> = new EventEmitter<string>();
    auctions : string = 'auctions';
    myAuctions : string = 'myAuctions';
    unresolved : string = 'unresolved';
    clickValue : string = this.auctions;


    ngOnInit(){

    }

    setMenuOption(option : string){
        console.log('hi');
        this.clickValue = option;
        this.buttonChoice.emit(option);
    }
}