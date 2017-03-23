///<reference path="../../../../../node_modules/rxjs/Observable.d.ts"/>
/**
 * Created by Umar on 20/01/2017.
 */

import {Component} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, Control, ControlGroup, FormBuilder, Validators} from 'angular2/common';
import {Inject} from "angular2/src/core/di/decorators";
import {Http, Headers, HTTP_PROVIDERS} from 'angular2/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/first';
import {ValidatorService} from "../../services/validator.service.js";
import globals = require('../../config/globals.js');

/**
 * Class represents all form inputs in the create auction popup
 */
class FormInputs{
    auctionName: string;
    auctionDesc: string;
    length: number;
    protocol: string;
    maxGuidePrice : string = '12000';
    contractType : string;
    tradeType : string;
}

@Component({
    selector: 'createAuction-app',
    templateUrl: '/templates/auctionTemplates/createAuction.html',
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES],
    providers: [ValidatorService, HTTP_PROVIDERS]
})

/**
 * This component reperesents the popup for creating an auction
 */
export class CreateAuctionComponent {
    CreateGroup: ControlGroup;
    formInputs: FormInputs;
    headers: Headers;
    numberValidity : boolean = null;
    accountType : string;
    tradeTypes : Array<String> = globals.tradeTypes;

    constructor(@Inject(ValidatorService) validatorService : ValidatorService,
                @Inject(FormBuilder) fb: FormBuilder, @Inject(Http)private http: Http){
        this.formInputs = new FormInputs();
        this.CreateGroup = fb.group({
            'auctionName'   : new Control(this.formInputs.auctionName, Validators.required),
            'auctionDesc'   : new Control(this.formInputs.auctionDesc, Validators.required),
            'length'        : new Control(this.formInputs.length, Validators.compose([Validators.required,
                validatorService.isInteger, validatorService.isNotZero]) ),
            'protocol'      : new Control(this.formInputs.protocol, Validators.required),
            'maxGuidePrice' : new Control(this.formInputs.maxGuidePrice, Validators.compose([Validators.required,
                validatorService.isIntegerPrice(this.formInputs.protocol), validatorService.isNotZeroPrice(this.formInputs.protocol)])),
            'contractType'  : new Control(this.formInputs.contractType, Validators.required),
            'tradeType'     : new Control(this.formInputs.tradeType, Validators.required)
        });
    }

    /**
     * On initialising do... instead of constructor so data can be passed in
     */
    ngOnInit(){
        this.accountType = globals.accountType;
    }

    /**
     * Adds form inputs to an object
     * @param formInputs
     */
    addNewGroup(formInputs : FormInputs) {
        this.formInputs = new FormInputs();
        let data = {
            name:           formInputs.auctionName,
            description:    formInputs.auctionDesc,
            length:         formInputs.length,
            protocol:       formInputs.protocol,
            maxGuidePrice:  formInputs.maxGuidePrice,
            contractType:   formInputs.contractType,
            tradeType:      formInputs.tradeType
        };

        this.addAuctionPostRequest("/createAuction", data);
    }

    /**
     * Makes a post request to post the create auction with the given
     * data
     * @param url
     * @param data
     */
    addAuctionPostRequest(url, data) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');

        let body = JSON.stringify(data);

        this.http.post(url, body, {headers: this.headers})
           .map(res => (res.json())).subscribe();
    }
}