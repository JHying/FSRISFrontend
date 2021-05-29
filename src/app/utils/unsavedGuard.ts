import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/index';
import {Injectable} from '@angular/core';

@Injectable()
export class UnsavedGuard implements CanDeactivate<any> {
  canDeactivate(component: any,
                route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | boolean {
    return window.confirm('確定離開此頁？已填的資料將不會被保存。');
  }
}
