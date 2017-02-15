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
    results : any;

    constructor(@Inject(Http)private http:Http){
        this.getResults();
    }

   /* ngOnInit(){

    }*/

    getResults(){
       this.http.get("/completedAuctions", {})
           .subscribe(
                results => this.results = results.json(),
                () => console.log(this.results)
            );
        //this.results = x;
    }


}