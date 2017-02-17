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

    public isNotZero = (control : Control) => {
        return checkIsZero(control.value) ? null : {
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
    console.log((parseFloat(value) == parseInt(value)) && !isNaN(value));
    return (parseFloat(value) == parseInt(value)) && !isNaN(value);
}

function checkIsZero(value : any){
    return (value > 0);
}

function checkIsIntegerPrice(value: any, protocol: any) {
    if(protocol == 'English' || protocol == 'Dutch') {
        console.log((parseFloat(value) == parseInt(value)) && !isNaN(value));
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