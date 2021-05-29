import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/internal/operators';
import {throwError} from 'rxjs/index';

const SERVER_URL = 'http://localhost:3000';

const httpOptions = {
  // headers: new HttpHeaders({
  //   Authorization: 'Token'
  // }),
  withCredentials: true
};

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {

  constructor(private http: HttpClient) {}

  /**
   * 訂閱
   */
  public sendSubscriptionToTheServer(subscription) {
    return this.http.post(SERVER_URL + '/pushNotification/subscription', subscription, httpOptions).pipe(catchError(this.handleError));
  }

  /**
   * 推播
   */
  public getNotificationFromTheServer() {
    return this.http.post(SERVER_URL + '/pushNotification/sendNotification', {}, httpOptions).pipe(catchError(this.handleError));
  }

  handleError(error) {
    return throwError(error.error.message);
  }
}
