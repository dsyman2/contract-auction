/**
 * Created by Umar on 11/01/2017.
 */
import {Component} from 'angular2/core';
import {Input} from "angular2/src/core/metadata";
import {ClockAppComponent} from './clockApp.component.js';

@Component({
    selector: 'auction-app',
    templateUrl: '/templates/auction.html',
    directives: [ClockAppComponent]
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
    time : number = 0;
    active : boolean = true;

    ngOnInit() {
        console.log("username is:" + this.username);
        this.socket = io('http://localhost:8000');

        this.socket.on('priceUpdate-' +this.id, function(data){
            this.price = data;
        }.bind(this));



       /* this.socket.on('timeRemaining-' + this.id, function(data){
            this.time = data;
            console.log("Time is: " + data);
        }.bind(this));*/

       /* this.id = this.auction.id;
        this.name = this.auction.name;
        this.desc = this.auction.description;
        this.creator = this.auction.creatorID;*/
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