/**
 * Created by Umar on 04/02/2017.
 */
import {Injectable} from "angular2/src/core/di/decorators";
import {Control} from "angular2/src/common/forms/model";

@Injectable()
export class ValidatorService {

    public isInteger = (control : Control) => {
        return checkIsInteger(control.value) ? null : {
            valid: true
            }
    };
}

function checkIsInteger(value: any) {
    console.log((parseFloat(value) == parseInt(value)) && !isNaN(value));
    return (parseFloat(value) == parseInt(value)) && !isNaN(value);
}