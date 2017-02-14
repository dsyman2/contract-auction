/**
 * Created by Umar on 12/02/2017.
 */
import {Component} from 'angular2/core';
import {Input} from "angular2/src/core/metadata";

@Component({
    selector: 'result-app',
    templateUrl: '/templates/result.html',
})

export class AuctionResultComponent {
    @Input()result : string;
    @Input()id : string;
    @Input()aucID : string;
    @Input()name : string;
    @Input()desc : string;
    @Input()creator : string;
    @Input()username;
    @Input()protocol : string;
    @Input()winner : string;
    @Input()price : any;

    ngOnInit() {
        console.log(this.protocol);
    }
}