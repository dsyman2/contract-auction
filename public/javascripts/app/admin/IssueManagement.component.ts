/**
 * Created by Umar on 05/03/2017.
 */
import {Component} from "angular2/src/core/metadata";
import {Inject} from "angular2/src/core/di/decorators";
import {HTTP_PROVIDERS, Http} from "angular2/http";

@Component({
    selector: 'issue-management-app',
    templateUrl: '/templates/adminTemplates/issueManagement.html',
    providers: [HTTP_PROVIDERS]
})

export class IssueManagementComponent {

    suspiciousUsers: any;
    suspUsers : any;

    constructor(@Inject(Http)private http: Http){
        this.getSuspiciousUsers();
    }

    getSuspiciousUsers() {
        return this.http.get('/getSuspiciousUsers', {})
            .subscribe(
                suspiciousUsers => this.suspiciousUsers = suspiciousUsers.json(),
                () => console.log('hi'),
                () => this.suspUsers = Object.keys(this.suspiciousUsers)

            );
    }
}