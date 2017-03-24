/**
 * Created by Umar on 04/02/2017.
 */
import {Injectable} from "angular2/src/core/di/decorators";
import {Control} from "angular2/src/common/forms/model";

/**
 * Validator service is used to validate user input throughout
 */
@Injectable()
export class ValidatorService {

    public isInteger = (control : Control) => {
        return checkIsInteger(control.value) ? null : {
            valid: true
            }
    };

    public isFloat = (control : Control) => {
        return checkIsFloat(control.value) ? null : {
                valid: true
            }
    };

    public isNotZero = (control : Control) => {
        return checkIsZero(control.value) ? null : {
            valid: true
            }
    };

    public isValidEmailFormat = (control : Control) => {
        return isValidEmailFormat(control.value) ? null : {
                valid: true
            }
    };

    public isPhoneNumberLength = (control : Control) => {
        return isPhoneNumberLength(control.value) ? null : {
                valid: true
            }
    };

    public isIntegerPrice(protocol){
      return (control : Control) => {
          return checkIsIntegerPrice(control.value, protocol) ? null : {
                  valid: true
              }
      };
    }

    public isNotZeroPrice (protocol){
        return (control : Control) => {
            return checkIsZeroPrice(control.value, protocol) ? null : {
                    valid: true
                }
        };
    }


}

function checkIsInteger(value: any) {
    return (parseFloat(value) == parseInt(value)) && !isNaN(value);
}

function checkIsFloat(value: any) {
    return (parseFloat(value) == parseFloat(value)) && !isNaN(value);
}

function checkIsZero(value : any){
    return (parseInt(value) > 0);
}

function checkIsIntegerPrice(value: any, protocol: any) {
    if(protocol == 'English' || protocol == 'Dutch') {
        return (parseFloat(value) == parseInt(value)) && !isNaN(value);
    }
    return (parseFloat('1') == parseInt('1')) && !isNaN(1);
}

function checkIsZeroPrice(value : any, protocol : any){
    if(protocol == 'English' || protocol == 'Dutch') {
        return (value > 0);
    }
    return (parseFloat('1') == parseInt('1')) && !isNaN(1);
}

function isValidEmailFormat(value : any) {
    // RFC 2822 compliant regex
    if (value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
        return true;
    }
    return null;
}

function isPhoneNumberLength(value : any) {
    if(value.length > 10){
        return true;
    }
    return null;
}