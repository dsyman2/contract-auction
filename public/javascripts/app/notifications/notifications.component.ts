/**
 * Created by Umar on 18/02/2017.
 */
import { Component } from 'angular2/core';

import { NotificationsService } from './notifications.service.js';
import { Notification } from './notifications.model.js';
import {Inject} from "angular2/src/core/di/decorators";

//https://matthewross.me/blog/posts/notifications-an-angular-2-component
@Component({
    selector: 'notifications',
    templateUrl: '/templates/notifications.html'
})

/**
 * This is notifications component for the data contian in notifications
 * and does the logic involved with these
 */
export class Notifications {
    private _notes: Notification[];

    constructor(@Inject(NotificationsService) private _notifications: NotificationsService) {
        this._notes = new Array<Notification>();

        _notifications.noteAdded.subscribe(note => {
            this._notes.push(note);

            setTimeout(() => { this.hide.bind(this)(note) }, 5000);
        });
    }

    /**
     * Hides the notification
     * @param note
     */
    private hide(note) {
        let index = this._notes.indexOf(note);

        if (index >= 0) {
            this._notes.splice(index, 1);
        }
    }
}