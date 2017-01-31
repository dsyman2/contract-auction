/**
 * Created by Umar on 29/01/2017.
 */
import {Component} from 'angular2/core';
import {AuctionAppComponent} from './auctionApp.component.js';

/* component in angular2 */
@Component({
    selector: 'auction-holder',
    templateUrl: '/templates/auctionHolder.html',
    directives: [AuctionAppComponent]

})

export class AuctionHolderComponent {
    auctions = [];
    socket = null;

    constructor(){
        this.socket = io('http://localhost:8000');

        this.socket.on('auctionList', function(data){
            this.auctions = data;
            console.log(this.auctions);
        }.bind(this));
    }
}