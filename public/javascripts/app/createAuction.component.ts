/**
 * Created by Umar on 20/01/2017.
 */

import {Component} from 'angular2/core';
import {CORE_DIRECTIVES, NgClass, FORM_DIRECTIVES, Control, ControlGroup, FormBuilder, Validators} from 'angular2/common';
import {Inject} from "angular2/src/core/di/decorators";


class FormInputs{
    auctionName: string;
    auctionDesc: string;
    length: number;
    protocol: any;
    creatorID: string;
}

@Component({
    selector: 'createAuction-app',
    templateUrl: '/templates/createAuction.html',
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES]
})

export class CreateAuctionComponent {
    CreateGroup: ControlGroup;
    formInputs: FormInputs;

    constructor(@Inject(FormBuilder) fb: FormBuilder){
        this.formInputs = new FormInputs();
        this.CreateGroup = fb.group({
            'auctionName'   : new Control(this.formInputs.auctionName, Validators.required),
            'auctionDesc'   : new Control(this.formInputs.auctionDesc, Validators.required),
            'length'        : new Control(this.formInputs.length, Validators.required),
            'protocol'      : new Control(this.formInputs.protocol, Validators.required),
            'creatorID'     : new Control(this.formInputs.creatorID, Validators.required)
        })
    }

    addNewGroup(formInputs : FormInputs) {
        this.formInputs = new FormInputs();

    }
}