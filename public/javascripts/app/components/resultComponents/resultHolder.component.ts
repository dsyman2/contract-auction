/**
 * Created by Umar on 12/02/2017.
 */
import {Component} from 'angular2/core';
import 'rxjs/Rx';
import {Http, HTTP_PROVIDERS} from "angular2/http";
import {Inject} from "angular2/src/core/di/decorators";
import globals = require('../../config/globals.js');
import {AuctionResultComponent} from "./auctionResult.component.js";

@Component({
    selector: 'result-holder',
    templateUrl: '/templates/resultTemplates/resultHolder.html',
    providers: [HTTP_PROVIDERS],
    directives: [AuctionResultComponent]
})

/**
 * This component holds all auction results and functions for these results
 */
export class ResultHolderComponent {
    createdList : any;
    wonList: any;
    won : boolean = false;
    createdB : boolean = false;
    accountType : string;

    constructor(@Inject(Http)private http:Http){
        this.getCreatedAucResults();
        this.getWonAucResults();
    }

    /**
     * On initialising do... instead of constructor so data can be passed in
     */
    ngOnInit(){
        this.accountType = globals.accountType;
    }

    /**
     * Get request for all completed auctions which are created by contract issuers
     */
    getCreatedAucResults(){
       this.http.get("/completedAuctions", {})
           .subscribe(
               createdList => this.createdList = createdList.json().reverse(),
                () => this.createdB = true
            );
    }

    /**
     * Get request for all won auctions which are created by contractors
     */
    getWonAucResults(){

        this.http.get("/wonAuctions", {})
            .subscribe(
                wonList => this.wonList = wonList.json().reverse(),
                () => this.won = true
            );
    }

}