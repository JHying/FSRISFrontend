import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs/index';
import {catchError, delay, map} from 'rxjs/internal/operators';

const SERVER_URL = '//fsrisserver.ap-southeast-1.elasticbeanstalk.com/FSRIS'; // env

const VALIDATION = {
  // headers: new HttpHeaders({
    //   // 'Access-Control-Allow-Origin': 'http://localhost:4200',
    //   // 'Access-Control-Expose-Headers': 'header1, header2',
    // Origin: 'http://fsris-client.s3-website-ap-northeast-1.amazonaws.com',
    //   'Content-Security-Policy': 'upgrade-insecure-requests'
  // }),
  withCredentials: false
};

// export interface Rsp {
//   Subsid: String;
//   SubsNameCh: String;
// }
// 使Service成為可被注入的元件
@Injectable({
  // 請把我註冊在整個系統都是使用同一個實體的注射器裡
  // 整個系統就只只會有一個實體，類似 Singleton 的概念
  // 如果這個 Service 在整個 Angular 的生命週期裡都沒有被使用到，
  // Angular 在編譯的時候，會透過 Tree-Shaking 機制把這個 Service 剔除
  providedIn: 'root'
})
export class HttpClientService {

  // 注入 HttpClient 到 service
  constructor(private httpClient: HttpClient) {
  }

  /**
   * Observable負責產生資料，創建後不會馬上啟動，須待_關注(subscribe)後開始啟動_。
   */
  public httpPost(url, JSONobj): Observable<any> {
    return this.httpClient.post<any>(SERVER_URL + url, JSONobj, VALIDATION)
      .pipe(
        delay(100),
        map((data: any) => (data || data.data || data.json())),
        catchError(this.handleError('httpPost'))
      );
  }

  public httpGet(url): Observable<any> {
    return this.httpClient.get<any>(SERVER_URL + url, VALIDATION)
      .pipe(
        delay(100),
        map((data: any) => (data || data.data || data.json())),
        catchError(this.handleError('httpGet'))
      );
  }

  /**
   * 處理http發生的錯誤，讓程式可以繼續正確的運作而不產生exception
   * @param operation - 失敗的操作，這邊是getHeroes
   * @param result - 可不傳入，最後要回傳出去的Observable物件內容，可在裡面塞一些失敗時要回傳的資料
   * 在上面的T是類型參數，在這個例子中，T代表Hero[]。
   * 這可以讓程式在打api失敗時依舊可取得符合應用程式所期望的類型的回傳值。
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // return throwError(error);
      return of(result as T);
    };
  }

}
