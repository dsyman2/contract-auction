/**
 * Created by Umar on 11/01/2017.
 */
import {Component} from 'angular2/core';
import {Input} from "angular2/src/core/metadata";

/* component in angular2 */
@Component({
    selector: 'auction-app',
    templateUrl: '/templates/product.html'
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

    ngOnInit(){
        this.socket = io('http://localhost:8000');

        this.socket.on('priceUpdate-' +this.id, function(data){
            this.price = data;
        }.bind(this));

       /* this.id = this.auction.id;
        this.name = this.auction.name;
        this.desc = this.auction.description;
        this.creator = this.auction.creatorID;*/
    }



    bid(){
        this.socket.emit('bid-'+this.id, this.bidValue);
        this.bidValue = '';
    }
}