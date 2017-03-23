/**
 * Created by Umar on 01/03/2017.
 */
import {Component, Input, Output} from "angular2/src/core/metadata";
import {EventEmitter} from "angular2/src/facade/async";

@Component({
    selector: 'user-info',
    templateUrl: '/templates/adminTemplates/userInfo.html',
    providers: []
})

/**
 * UserInfoComponent represents one user fraud rep in the front end
 */
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

    /**
     * Emits a delete signal to the controller
     */
    sendDelete(){
        this.deleteUserEvent.emit(this.id);
    }
}