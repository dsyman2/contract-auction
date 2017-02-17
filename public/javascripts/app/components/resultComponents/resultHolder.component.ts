/**
 * Created by Umar on 12/02/2017.
 */
import {Component} from 'angular2/core';
import 'rxjs/Rx';
import {Http, HTTP_PROVIDERS} from "angular2/http";
import {Inject} from "angular2/src/core/di/decorators";

import {AuctionResultComponent} from "./auctionResult.component.js";

@Component({
    selector: 'result-holder',
    templateUrl: '/templates/resultTemplates/resultHolder.html',
    providers: [HTTP_PROVIDERS],
    directives: [AuctionResultComponent]
})

export class ResultHolderComponent {
    createdList : any;
    wonList: any;
    won : boolean = false;
    createdB : boolean = false;

    constructor(@Inject(Http)private http:Http){
        this.getCreatedAucResults();
        this.getWonAucResults();
    }

    getCreatedAucResults(){
       this.http.get("/completedAuctions", {})
           .subscribe(
               createdList => this.createdList = createdList.json(),
                () => console.log(this.createdList),
               () => this.createdB = true
            );
        //this.results = x;
    }

    getWonAucResults(){

        this.http.get("/wonAuctions", {})
            .subscribe(
                wonList => this.wonList = wonList.json(),
                () => console.log(this.wonList),
                () => this.won = true
            );
    }



}