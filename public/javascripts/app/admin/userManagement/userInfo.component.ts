/**
 * Created by Umar on 01/03/2017.
 */
import {Component, Input, Output} from "angular2/src/core/metadata";
import {URLSearchParams} from "angular2/src/http/url_search_params";
import {Inject} from "angular2/src/core/di/decorators";
import {HTTP_PROVIDERS, Http, Headers} from "angular2/http";
import {RequestOptions} from "angular2/src/http/base_request_options";
import {EventEmitter} from "angular2/src/facade/async";

/**
 * Created by Umar on 01/03/2017.
 */

@Component({
    selector: 'user-info',
    templateUrl: '/templates/adminTemplates/userInfo.html',
    providers: []
})

export class UserInfoComponent {
    @Input()username : string;
    @Input()email : string;
    @Input()accountType : string;
    @Input()address : string;
    @Input()contactNumber : string;
    @Input()id : string;
    @Output() deleteUserEvent: EventEmitter<string> = new EventEmitter<string>();


    constructor() {

    }

    sendDelete(){
        this.deleteUserEvent.emit(this.id);
    }
}