import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class NotificationService implements OnDestroy {
  private readonly apiUrl = environment.apiUrl;

  private _notifications = new BehaviorSubject<Notification[] | null>(null);
  notifications$ = this._notifications.asObservable();

  deleteNotification(){
    //   this._user.next({
    //     id: loginResult.userId,
    //     email: loginResult.email,
    //   });
  }

  ngOnDestroy(): void {
  }
}