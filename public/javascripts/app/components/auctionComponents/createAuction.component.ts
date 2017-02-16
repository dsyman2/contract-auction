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

class FormInputs{
    auctionName: string;
    auctionDesc: string;
    length: number;
    protocol: any;
   // creatorID: string;
}

@Component({
    selector: 'createAuction-app',
    templateUrl: '/templates/auctionTemplates/createAuction.html',
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES],
    providers: [ValidatorService, HTTP_PROVIDERS]
   // providers: [HTTP_PROVIDERS]
})


export class CreateAuctionComponent {
    CreateGroup: ControlGroup;
    formInputs: FormInputs;
    //requestOptions: RequestOptions;
    headers: Headers;
   // http: Http;
    numberValidity : boolean = null;

    constructor(@Inject(ValidatorService) validatorService : ValidatorService,
                @Inject(FormBuilder) fb: FormBuilder, @Inject(Http)private http: Http){
        this.formInputs = new FormInputs();
        this.CreateGroup = fb.group({
            'auctionName'   : new Control(this.formInputs.auctionName, Validators.required),
            'auctionDesc'   : new Control(this.formInputs.auctionDesc, Validators.required),
            'length'        : new Control(this.formInputs.length, Validators.compose([Validators.required,
                validatorService.isInteger, validatorService.isNotZero]) ),
            'protocol'      : new Control(this.formInputs.protocol, Validators.required)
        })
    }

    addNewGroup(formInputs : FormInputs) {
        this.formInputs = new FormInputs();
        let data = {
            name:           formInputs.auctionName,
            description:    formInputs.auctionDesc,
            length:         formInputs.length,
            protocol:       formInputs.protocol
        };

        this.addAuctionPostRequest("/createAuction", data);
    }

    addAuctionPostRequest(url, data) {
        console.log("auction name: " + data.auctionName);

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');

        let body = JSON.stringify(data);

        this.http.post(url, body, {headers: this.headers})
           .map(res => (res.json())).subscribe();
    }
}