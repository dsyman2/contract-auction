///<reference path="../../../node_modules/rxjs/Observable.d.ts"/>
/**
 * Created by Umar on 20/01/2017.
 */

import {Component} from 'angular2/core';
import {CORE_DIRECTIVES, NgClass, FORM_DIRECTIVES, Control, ControlGroup, FormBuilder, Validators} from 'angular2/common';
import {Inject} from "angular2/src/core/di/decorators";
import {Http, Headers, RequestOptions, RequestMethod, Request, Response} from 'angular2/http';
//import {RequestOptions} from "angular2/src/http/base_request_options";
//import {RequestMethod} from "angular2/src/http/enums";
//import {Request} from "angular2/src/http/static_request";
//import {Response} from "angular2/src/http/static_response";
import 'rxjs/Rx';
import 'rxjs/add/operator/first';

class FormInputs{
    auctionName: string;
    auctionDesc: string;
    length: number;
    protocol: any;
   // creatorID: string;
}

@Component({
    selector: 'createAuction-app',
    templateUrl: '/templates/createAuction.html',
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES],
})


export class CreateAuctionComponent {
    CreateGroup: ControlGroup;
    formInputs: FormInputs;
    requestOptions: RequestOptions;
    headers: Headers;
   // http: Http;

    constructor(@Inject(FormBuilder) fb: FormBuilder, private http: Http){
        this.formInputs = new FormInputs();
        this.CreateGroup = fb.group({
            'auctionName'   : new Control(this.formInputs.auctionName, Validators.required),
            'auctionDesc'   : new Control(this.formInputs.auctionDesc, Validators.required),
            'length'        : new Control(this.formInputs.length, Validators.required),
            'protocol'      : new Control(this.formInputs.protocol, Validators.required)
            //'creatorID'     : new Control(this.formInputs.creatorID, Validators.required)
        })
    }

    addNewGroup(formInputs : FormInputs) {
        this.formInputs = new FormInputs();
        var data = {
            name:    formInputs.auctionName,
            description:    formInputs.auctionDesc,
            length:         formInputs.length,
            protocol:       formInputs.protocol
           // creatorID:      formInputs.creatorID
        };

        this.addAuctionPostRequest("/createAuction", data);
    }

    addAuctionPostRequest(url, data) {
        console.log("auction name: " + data.auctionName);
       /* let headers = new Headers({
            'Content-Type': 'application/json'
        });*/

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');


       /* this.requestOptions = new RequestOptions({
            method: RequestMethod.Post,
            url: url,
            headers: this.headers,
            body: JSON.stringify(data)
        });

        return this.http.request(new Request(this.requestOptions))
            .map((res: Response) => {
                if(res) {
                    return [{status: res.status, json: res.json() }]
                }
            });*/
       var body = JSON.stringify(data);

        this.http.post(url, body, {headers: this.headers})
           .map(res => (res.json())).subscribe();
    }
}