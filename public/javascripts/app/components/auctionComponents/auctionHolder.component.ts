/**
 * Created by Umar on 29/01/2017.
 */
import {Component} from 'angular2/core';
import {AuctionAppComponent} from './auctionApp.component.js';
import {Input, Output} from "angular2/src/core/metadata";
import globals = require('../../config/configer.js');


@Component({
    selector: 'auction-holder',
    templateUrl: '/templates/auctionTemplates/auctionHolder.html',
    directives: [AuctionAppComponent]
})

/**
 * This component acts as a holder for the auction widgets,
 * it gets the auction data via socket.io
 */
export class AuctionHolderComponent {
    auctions = {};
    socket = null;
    @Input()user;
    private arrayOfAucs: string[];
    filterContractType: string = 'All';
    filterTradeType : string = 'All';
    tradeTypes : Array<String> = globals.tradeTypes;

    /**
     * On initialising do... instead of constructor so data can be passed in
     */
    ngOnInit(){
        this.user = localStorage.getItem('username');
        this.socket = io(globals.socket_src)

        this.socket.on('auctionList', function(data){
            this.auctions = data;
            this.arrayOfAucs = Object.keys(this.auctions);
        }.bind(this));
    }
}