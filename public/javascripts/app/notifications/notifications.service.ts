/**
 * Created by Umar on 18/02/2017.
 */
import { Injectable } from 'angular2/core';
import { Subject } from 'rxjs/Subject';
import { Notification } from './notifications.model.js';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class NotificationsService {
    private _notifications = new Subject<Notification>();

    public noteAdded = new Observable(fn => this._notifications._subscribe(fn));

    public add(notification: Notification) {
        this._notifications.next(notification);
    }
}