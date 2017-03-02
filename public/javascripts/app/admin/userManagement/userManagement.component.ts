import {Component} from "angular2/src/core/metadata";
import {URLSearchParams} from "angular2/src/http/url_search_params";
import {Inject} from "angular2/src/core/di/decorators";
import {HTTP_PROVIDERS, Http} from "angular2/http";
import {UserInfoComponent} from "./userInfo.component.js";
import {RequestOptions} from "angular2/src/http/base_request_options";
import {Headers} from "angular2/src/http/headers";

/**
 * Created by Umar on 01/03/2017.
 */

@Component({
    selector: 'user-management-app',
    templateUrl: '/templates/adminTemplates/userManagement.html',
    providers: [HTTP_PROVIDERS],
    directives: [UserInfoComponent]
})

export class UserManagementComponent {
    usersList : any;
    filterSettings: string = 'All';
    private options = new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})});
    hasDeleted : boolean = undefined;

    constructor(@Inject(Http)private http: Http) {
        this.getAllUsers();
    }

    getAllUsers(){
        return this.http.get('/allUserDetails', {})
            .subscribe(
                usersList => this.usersList = usersList.json(),
                () => console.log('hi' + this.usersList)
            );
    }

    onDeleteUserEvent(userID : string){
        console.log('hello event');
        let params: URLSearchParams = new URLSearchParams();
        params.set("userID", userID);
        this.options.search = params;

        return this.http.get('/deleteUser', this.options)
            .subscribe(
                result => this.hasDeleted = result.json(),
                () => console.log('hasChanged : ' + this.hasDeleted),
                () => this.getAllUsers()
            );
    }
}