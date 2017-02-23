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
import config = require('../../config/configer.js');
import globals = require('../../config/globals.js');
import {NotificationsService} from "../../notifications/notifications.service.js";
import {Notification} from "../../notifications/notifications.model.js";

class FormInputs{
    bidValue : string ='';
}

@Component({
    selector: 'auction-app',
    templateUrl: '/templates/auctionTemplates/auction.html',
    directives: [ClockAppComponent, MessageComponent, FORM_DIRECTIVES],
    providers: [HTTP_PROVIDERS, ValidatorService, FormBuilder]
})

export class AuctionAppComponent {
    price : number = 0.0;
    socket = null;
    bidValue : string= '';
    userID : string;
    @Input()auction : any;
    @Input()id : string;
    @Input()name : string;
    @Input()desc : string;
    @Input()creator : string;
    @Input()username;
    @Input()protocol : string;
    @Input()contractType : string;
    time : number = 0;
    active : boolean = true;
    showNotif : boolean = false;
    CreateGroup : ControlGroup;
    formInputs : FormInputs;
    accountType : string;

    constructor(@Inject(Http)private http:Http, @Inject(NotificationsService)private _notes: NotificationsService,
                @Inject(ValidatorService) validatorService : ValidatorService, @Inject(FormBuilder) fb: FormBuilder ){
        if (this.protocol != 'Dutch') {
            this.formInputs = new FormInputs();
            this.CreateGroup = fb.group({
                'bidValue': new Control(this.formInputs.bidValue, Validators.compose([Validators.required,
                    validatorService.isFloat, validatorService.isNotZero]))
            });
        }
    }

    ngOnInit() {
        this.accountType = globals.accountType;
        console.log("username is:" + this.creator);
        this.userID = globals.userID;
        this.socket = io(config.socket_src);

        this.socket.on('priceUpdate-' + this.id, function (data) {
            console.log(data);
            this.price = +parseFloat(data);
            if(this.showNotif){
                this.throwPushNotification('Bid for auction: ' + this.name + '. \n Price: £' + this.price + '.');
            }

            this.showNotif = true;

        }.bind(this));

        this.socket.on('auctionEnd-' + this.id, function (data) {
            console.log('over and out: ' + data);
        });
    }

    addNewGroup(formInputs : FormInputs) {
        this.formInputs = new FormInputs();
        let data = {
            bidVal: formInputs.bidValue,
        };

        this.bidParam(data);
    }

    bid() {
        this.showNotif = true;
        this.socket.emit('bid-'+this.id, {
            bid: this.bidValue,
            bidder: this.username
        });

        this.bidValue = '';
    }

    bidParam(data){
        this.showNotif = true;
        this.socket.emit('bid-'+this.id, {
            bid: data.bidVal,
            bidder: this.username
        });

        this.formInputs.bidValue = '';
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

    throwPushNotification(message: string){
        this._notes.add(new Notification('error', message));
    }

    togglePushNotif(){
        this.showNotif = !this.showNotif;
    }
}