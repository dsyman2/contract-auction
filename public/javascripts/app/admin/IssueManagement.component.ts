/**
 * Created by Umar on 05/03/2017.
 *
 */
import {Component} from "angular2/src/core/metadata";
import {Inject} from "angular2/src/core/di/decorators";
import {HTTP_PROVIDERS, Http} from "angular2/http";

@Component({
    selector: 'issue-management-app',
    templateUrl: '/templates/adminTemplates/issueManagement.html',
    providers: [HTTP_PROVIDERS]
})

/**
 * Issue Management component is used to display all the suspicious users
 */
export class IssueManagementComponent {

    suspiciousUsers: any;
    suspUsers : any;

    constructor(@Inject(Http)private http: Http){
        this.getSuspiciousUsers();
    }

    /**
     * Makes http request to get all suspicious users
     * @returns {Subscription<Response>}
     */
    getSuspiciousUsers() {
        return this.http.get('/getSuspiciousUsers', {})
            .subscribe(
                suspiciousUsers => this.suspiciousUsers = suspiciousUsers.json(),
                () => this.suspUsers = Object.keys(this.suspiciousUsers)

            );
    }
}