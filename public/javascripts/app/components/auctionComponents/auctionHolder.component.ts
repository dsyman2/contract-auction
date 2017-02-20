/**
 * Created by Umar on 29/01/2017.
 */
import {Component} from 'angular2/core';
import {AuctionAppComponent} from './auctionApp.component.js';
import {Input, Output} from "angular2/src/core/metadata";
import {Http} from "angular2/src/http/http";
import {EventEmitter} from "angular2/src/facade/async";


/* component in angular2 */
@Component({
    selector: 'auction-holder',
    templateUrl: '/templates/auctionTemplates/auctionHolder.html',
    directives: [AuctionAppComponent]
})

export class AuctionHolderComponent {
    auctions = {};
    socket = null;
    @Input()user;
    private arrayOfAucs: string[];
    @Output() pushNotifToMain: EventEmitter<string> = new EventEmitter<string>();

    ngOnInit(){
        //console.log("u" + this.user);
        this.user = localStorage.getItem('username');

        //this.socket = io('http://localhost:8000');
        this.socket = io('http://ec2-52-56-141-53.eu-west-2.compute.amazonaws.com:8000')

        this.socket.on('auctionList', function(data){
            this.auctions = data;
            console.log(this.auctions);
            this.arrayOfAucs = Object.keys(this.auctions);
        }.bind(this));


        console.log(this.arrayOfAucs);

    }

    onPushNotif(notif:string){
        this.pushNotifToMain.emit(notif);
    }
}