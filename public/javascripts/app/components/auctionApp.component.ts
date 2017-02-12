/**
 * Created by Umar on 11/01/2017.
 */
import {Component} from 'angular2/core';
import {Input} from "angular2/src/core/metadata";
import {ClockAppComponent} from './clockApp.component.js';
import {MessageComponent} from "./message.component.js";
import {Http, Headers, HTTP_PROVIDERS} from 'angular2/http';
import 'rxjs/Rx';
import {Inject} from "angular2/src/core/di/decorators";

@Component({
    selector: 'auction-app',
    templateUrl: '/templates/auction.html',
    directives: [ClockAppComponent, MessageComponent],
    providers: [HTTP_PROVIDERS]
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


    constructor(@Inject(Http)private http:Http){}

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

    sendDelete(){
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');

        let data = {id: this.id};
        let body = JSON.stringify(data);

        this.http.post("/deleteAuction", body, {headers: this.headers})
            .map(res => (res.json())).subscribe();
    }
}