/**
 * Created by Umar on 29/01/2017.
 */
import {Component} from 'angular2/core';
import {AuctionAppComponent} from './auctionApp.component.js';
import {Input} from "angular2/src/core/metadata";
import {Http} from "angular2/src/http/http";


/* component in angular2 */
@Component({
    selector: 'auction-holder',
    templateUrl: '/templates/auctionHolder.html',
    directives: [AuctionAppComponent]
})

export class AuctionHolderComponent {
    auctions = {};
    socket = null;
    @Input()user;
    private arrayOfAucs: string[];

    ngOnInit(){
        //console.log("u" + this.user);
        this.user = localStorage.getItem('username');

        this.socket = io('http://localhost:8000');

        this.socket.on('auctionList', function(data){
            this.auctions = data;
            console.log(this.auctions);
            this.arrayOfAucs = Object.keys(this.auctions);
        }.bind(this));


        console.log(this.arrayOfAucs);

    }
}