/**
 * Created by Umar on 11/01/2017.
 */
import {Component} from 'angular2/core';
import {Input, Output} from "angular2/src/core/metadata";
import {ClockAppComponent} from './clockApp.component.js';
import {MessageComponent} from "./message.component.js";
import {Http, Headers, HTTP_PROVIDERS} from 'angular2/http';
import 'rxjs/Rx';
import {Inject} from "angular2/src/core/di/decorators";
import {FORM_DIRECTIVES, Control, ControlGroup, FormBuilder, Validators} from 'angular2/common';
import {ValidatorService} from "../../services/validator.service.js";
import {EventEmitter} from "angular2/src/facade/async";


class FormInputs{
    bidValue : number;
}

@Component({
    selector: 'auction-app',
    templateUrl: '/templates/auctionTemplates/auction.html',
    directives: [ClockAppComponent, MessageComponent, FORM_DIRECTIVES],
    providers: [HTTP_PROVIDERS, ValidatorService]
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
    @Output() pushNotif: EventEmitter<string> = new EventEmitter<string>();

    /*CreateGroup: ControlGroup;
    formInputs: FormInputs;*/

    constructor(@Inject(Http)private http:Http, /*@Inject(ValidatorService) validatorService : ValidatorService,
                @Inject(FormBuilder) fb: FormBuilder*/){
        /*console.log('hihi');
        this.formInputs = new FormInputs();
        this.CreateGroup = fb.group({
            'bidValue'        : new Control(this.formInputs.bidValue, Validators.compose([Validators.required,
                validatorService.isInteger, validatorService.isNotZero]) )
        })*/
    }

    ngOnInit() {
        console.log("username is:" + this.username);
        this.socket = io('http://localhost:8000');
        //this.socket = io('http://ec2-52-56-141-53.eu-west-2.compute.amazonaws.com:8000')

        this.socket.on('priceUpdate-' + this.id, function (data) {
            this.price = parseInt(data);
            this.pushNotif.emit('Bid in for auction: ' + this.name + '. \n Price: ' + this.price + '.');
        }.bind(this));

        this.socket.on('auctionEnd-' + this.id, function (data) {
            console.log('over and out: ' + data);
        });
    }

    /*addNewGroup(formInputs : FormInputs) {
        this.formInputs = new FormInputs();
        let data = {
            bidVal: formInputs.bidValue,
        };

        this.bid(data);
    }*/

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