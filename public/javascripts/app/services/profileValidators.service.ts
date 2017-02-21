/**
 * Created by Umar on 20/02/2017.
 */
import {Injectable, Inject} from "angular2/src/core/di/decorators";
import {Control} from "angular2/src/common/forms/model";
import {Http} from "angular2/src/http/http";
import {URLSearchParams} from "angular2/src/http/url_search_params";



@Injectable()
export class ProfileValidatorsService {
    details : any;
    constructor(@Inject(Http)private http: Http){

    }
    public isNotUsed = (control : Control) => {
        return isNotUsed(control.value) ? null : {
                valid: true
            }
    };

}

function isNotUsed(value: any) {
    let params: URLSearchParams = new URLSearchParams();
    params.set("value", value);
    this.options.search = params;

    return this.http.get('/contactDetails', this.options)
        .subscribe(
            details => this.details = details.json(),
            () => console.log('hi' + this.details),
            () => console.log('lol')
        );
}

