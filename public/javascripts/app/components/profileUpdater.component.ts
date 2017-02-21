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

class FormInputs{
    email: string ="";
    contactNumber: string ="";
}
/* component in angular2 */
@Component({
    selector: 'profile',
    templateUrl: '/templates/profile.html',
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES],
    providers: [ValidatorService, HTTP_PROVIDERS]
})

export class ProfileUpdaterComponent {

    CreateGroup: ControlGroup;
    formInputs: FormInputs;
    private options = new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})});
    hasUpdated: boolean;

    constructor(@Inject(ValidatorService) validatorService : ValidatorService,
                @Inject(FormBuilder) fb: FormBuilder, @Inject(Http)private http: Http) {
        this.formInputs = new FormInputs();
        this.CreateGroup = fb.group({
            'email'         : new Control(this.formInputs.email, Validators.compose([Validators.required,
                validatorService.isValidEmailFormat])),
            'contactNumber' : new Control(this.formInputs.contactNumber, Validators.compose([Validators.required,
                validatorService.isInteger, validatorService.isPhoneNumberLength]))
        });
    }

    /*addNewGroup(formInputs : FormInputs) {
        this.formInputs = new FormInputs();
        let data = {
            email:           formInputs.email,
            contactNumber:    formInputs.contactNumber
        };

        this.updateProfile(data);
    }*/

    ngOnInit(){
    }

    updateProfile(formInputs : FormInputs){
        this.formInputs = new FormInputs();
        let params: URLSearchParams = new URLSearchParams();
        params.set("email", formInputs.email);
        params.set("contactNumber", formInputs.contactNumber);
        this.options.search = params;

        return this.http.get('/updateProfile', this.options)
            .subscribe(
                result => this.hasUpdated = result.json(),
                () => console.log('hasChanged : ' + this.hasUpdated),
                () => console.log('lol')
            );
    }
}