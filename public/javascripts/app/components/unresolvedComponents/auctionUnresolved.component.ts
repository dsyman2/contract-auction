/**
 * Created by Umar on 15/02/2017.
 */

import {Component} from 'angular2/core';
import {Input} from "angular2/src/core/metadata";

@Component({
    selector: 'unresolved-app',
    templateUrl: '/templates/unresolvedTemplates/unresolved.html',
})

export class AuctionUnresolvedComponent {
    @Input()unresolved : string;
    @Input()id : string;
    @Input()unresolvedID : string;
    @Input()name : string;
    @Input()desc : string;
    @Input()creator : string;
    @Input()username;
    @Input()protocol : string;
    @Input()maxGuidePrice : string;
    @Input()contractType : string;
    @Input()tradeType : string;

    ngOnInit() {
    }
}