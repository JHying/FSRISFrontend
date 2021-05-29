import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  ActivationEnd,
  GuardsCheckEnd, NavigationCancel, NavigationEnd, NavigationStart, Router,
  RoutesRecognized
} from '@angular/router';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit, OnDestroy {

  // @Input() 就是告訴 Child (呼叫頁) 他的 Parent (本頁) 可以綁定的參數
  // @Output() 就是 Child (呼叫頁) 先執行後將值傳回 Parent (本頁)
  // @Input() title: string;
  // @Input() subtitle: string;

  myObserver = null;
  slider: any = {
    title: '',
    subtitle: ''
  };

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.myObserver = this.router.events.subscribe((event) => {
      if (event instanceof ActivationEnd) {
        // 本事件會在路由器成功激活某個路由才觸發 (避免與 guard 衝突)
        this.slider = event.snapshot.parent.firstChild.data;
      }
    });
  }

  ngOnDestroy() {
    this.myObserver.unsubscribe();
  }
}
