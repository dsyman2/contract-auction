/**
 * Created by Umar on 12/02/2017.
 */
import {Component} from 'angular2/core';
import {Input} from "angular2/src/core/metadata";
import {HTTP_PROVIDERS} from "angular2/http";
import {RequestOptions} from "angular2/src/http/base_request_options";
import {URLSearchParams} from "angular2/src/http/url_search_params";
import {Http} from "angular2/src/http/http";
import {Inject} from "angular2/src/core/di/decorators";
import {Headers} from "angular2/src/http/headers";

@Component({
    selector: 'result-app',
    templateUrl: '/templates/resultTemplates/result.html',
    providers: [HTTP_PROVIDERS]
})

/**
 * This component represents an auction result widget
 */
export class AuctionResultComponent {
    @Input()result : string;
    @Input()id : string;
    @Input()aucID : string;
    @Input()name : string;
    @Input()desc : string;
    @Input()creator : string;
    @Input()username;
    @Input()protocol : string;
    @Input()winner : string;
    @Input()price : any;
    @Input()contractType : string;
    @Input()tradeType : string;

    private options = new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})});
    details : any;
    contactUsername : string;
    contactEmail : string;
    contactNum : string;
    resultView: boolean = false;

    /**
     * On initialising do... instead of constructor so data can be passed in
     */
    ngOnInit() {
        var idChoice = (this.winner == localStorage.getItem('userID')) ?
            this.creator : this.winner;
            this.getContactsByID(idChoice);
        }

    constructor(@Inject(Http)private http:Http){
    }

    /**
     * displays contact details
     */
    updateRes(){
        this.resultView = !this.resultView;
        this.contactUsername = this.details.username;
        this.contactEmail = this.details.email;
        this.contactNum = this.details.contactNumber;

    }

    /**
     * Gets contact details of user by id
     * @param id
     * @returns {Subscription<Response>}
     */
    getContactsByID(id : string){
        let params: URLSearchParams = new URLSearchParams();
        params.set("id", id);
        this.options.search = params;

        return this.http.get('/contactDetails', this.options)
            .subscribe(
                details => this.details = details.json()
            );
    }
}