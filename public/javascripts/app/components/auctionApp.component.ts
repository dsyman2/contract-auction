/**
 * Created by Umar on 11/01/2017.
 */
import {Component} from 'angular2/core';
import {Input} from "angular2/src/core/metadata";
import {ClockAppComponent} from './clockApp.component.js';
import {MessageComponent} from "./message.component.js";

@Component({
    selector: 'auction-app',
    templateUrl: '/templates/auction.html',
    directives: [ClockAppComponent, MessageComponent]
})

export class AuctionAppComponent {
    price : number = 0.0;
    socket = null;
    bidValue : string= '';
    @Input()auction : any;
    @Input()id : string;
    @Input()name : string;
    @Input()desc : string;
    @Input()creator : string;
    @Input()username;
    @Input()protocol : string;
    time : number = 0;
    active : boolean = true;

    ngOnInit() {
        console.log("username is:" + this.username);
        this.socket = io('http://localhost:8000');

        this.socket.on('priceUpdate-' + this.id, function (data) {
            this.price = data;
        }.bind(this));

        this.socket.on('auctionEnd-' + this.id, function (data) {
            console.log('over and out: ' + data);
        });
    }

    bid() {
        this.socket.emit('bid-'+this.id, {
            bid: this.bidValue,
            bidder: this.username
        });

        this.bidValue = '';
    }

    onTimeUp(data:string) {
        //alert(data);
        this.active = false;
    }
}