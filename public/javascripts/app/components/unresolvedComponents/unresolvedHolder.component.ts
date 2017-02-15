/**
 * Created by Umar on 15/02/2017.
 */
import {Component} from 'angular2/core';
import 'rxjs/Rx';
import {Http, HTTP_PROVIDERS} from "angular2/http";
import {Inject} from "angular2/src/core/di/decorators";
import {AuctionUnresolvedComponent} from "./auctionUnresolved.component.js";

@Component({
    selector: 'unresolved-holder',
    templateUrl: '/templates/unresolvedTemplates/unresolvedHolder.html',
    providers: [HTTP_PROVIDERS],
    directives: [AuctionUnresolvedComponent]
})

export class UnresolvedHolderComponent {
    unresolvedList : any;

    constructor(@Inject(Http)private http:Http){
        console.log('getunresolved');
        this.getUnresolved();
    }

    getUnresolved(){
        console.log('getunresolved');
        this.http.get("/unresolvedAuctions", {})
            .subscribe(
                unresolvedList => this.unresolvedList = unresolvedList.json(),
                () => console.log(this.unresolvedList)
            );
        //this.results = x;
    }


}