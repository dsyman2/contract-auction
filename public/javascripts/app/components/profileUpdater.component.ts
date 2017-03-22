/**
 * Created by Umar on 20/02/2017.
 */
import {Component} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, ControlGroup, Control, FormBuilder, Validators} from "angular2/common";
import {ValidatorService} from "../services/validator.service.js";
import {HTTP_PROVIDERS, Http, Headers} from "angular2/http";
import {Inject} from "angular2/src/core/di/decorators";
import {URLSearchParams} from "angular2/src/http/url_search_params";
import {RequestOptions} from "angular2/src/http/base_request_options";
import globals = require('../config/globals.js');

/**
 * Class holds the form inputs for profiles
 */
class FormInputs{
    email: string ="";
    contactNumber: string ="";
}

@Component({
    selector: 'profile',
    templateUrl: '/templates/profile.html',
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES],
    providers: [ValidatorService, HTTP_PROVIDERS]
})

/**
 * This components is used for the profile update panel which
 * allows users to update thier profile
 */
export class ProfileUpdaterComponent {

    CreateGroup: ControlGroup;
    formInputs: FormInputs;
    private options = new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})});
    hasUpdated: boolean = undefined;
    details : any;
    email: string;
    username : string;
    contactNumber : string;
    accountType : string;

    constructor(@Inject(ValidatorService) validatorService : ValidatorService,
                @Inject(FormBuilder) fb: FormBuilder, @Inject(Http)private http: Http) {
        this.formInputs = new FormInputs();
        this.CreateGroup = fb.group({
            'email'         : new Control(this.formInputs.email, Validators.compose([Validators.required,
                validatorService.isValidEmailFormat])),
            'contactNumber' : new Control(this.formInputs.contactNumber, Validators.compose([Validators.required,
                validatorService.isInteger, validatorService.isPhoneNumberLength]))
        });
        this.getProfileDetails();
    }

    /**
     * Sets up the profile data to be displayed
     */
    setProfileDetailsForDisplay(){
        this.username = this.details.username;
        this.email = this.details.email;
        this.contactNumber = this.details.contactNumber;
        this.accountType = this.details.accountType;
    }

    /**
     * Gets the user specif profile data
     * @returns {Subscription<Response>}
     */
    getProfileDetails(){
        let params: URLSearchParams = new URLSearchParams();
        params.set("id", globals.userID);
        this.options.search = params;
        return this.http.get('/contactDetails', this.options)
            .subscribe(
                details => this.details = details.json(),
                () => console.log(this.details.username),
                () => this.setProfileDetailsForDisplay()
            );
    }

    /**
     * Makes get request to update user profile data, withe
     * form inputs
     * @param formInputs
     * @returns {Subscription<Response>}
     */
    updateProfile(formInputs : FormInputs){
        this.formInputs = new FormInputs();
        let params: URLSearchParams = new URLSearchParams();
        params.set("email", formInputs.email);
        params.set("contactNumber", formInputs.contactNumber);
        this.options.search = params;

        return this.http.get('/updateProfile', this.options)
            .subscribe(
                result => this.hasUpdated = result.json(),
                () => this.getProfileDetails()
            );
    }
}