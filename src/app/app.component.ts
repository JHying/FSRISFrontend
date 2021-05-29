import {Component, OnInit} from '@angular/core';
import {SwPush, SwUpdate} from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private swUpdate: SwUpdate, private swPush: SwPush) {
  }

  ngOnInit() {
    this.updateVeriosn();
    this.notification();
  }

  updateVeriosn() {
    console.log('[SW]更新是否可啟動? ', this.swUpdate.isEnabled);
    if (this.swUpdate.isEnabled) {
      // console.log('[SW]是否須更新? ', this.swUpdate.checkForUpdate());
      this.swUpdate.available.subscribe(event => {
        if (confirm('New version available. Load New Version?')) {
          window.location.reload();
        }
      });
    }
  }

  notification() {
    this.swPush.messages.subscribe(
      (notification: any) => {
        console.log('received push message', notification);

        const options = {
          body: notification.body,
          icon: notification.icon,
          actions: notification.actions as any,
          vibrate: [100, 50, 10, 20, 20]
        };

        // this.showNotification(notification.title, options);
      },
      err => {
        console.error(err);
      }
    );
  }

  private showNotification(title: string, options: NotificationOptions) {
    navigator.serviceWorker.getRegistration().then(reg => {
      reg.showNotification(title, options).then(res => {
        console.log('showed notification', res);
      }, err => {
        console.error(err);
      });
    });
  }

}
