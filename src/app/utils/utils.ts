import {MatDialogConfig} from '@angular/material';
import {ActivatedRoute} from '@angular/router';
export class Utils {

  constructor() {
  }

  public static goTo(location: string, route: ActivatedRoute) {
    route.fragment.subscribe(f => {
      setTimeout(() => {// 需一段時間搜尋才找得到??????沒加會找不到div
        const element = document.getElementById(location);
        // console.log(location);
        // console.log(element);
        if (element) {
          element.scrollIntoView({behavior: 'smooth'});
        }
      }, 0);
    });
  }

  public static myDialogConfig(id: any, title: string, dialogContents: any): MatDialogConfig {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '70%';
    dialogConfig.data = {
      id,
      title,
      contents: dialogContents
    };
    return dialogConfig;
  }

  public static fusionChartsGuage(risk: number = 0, lower: number = 0, upper: number = 0) {
    return {
      chart: {
        subcaption: '指針-真實風險',
        gaugeFillMix: '{dark-40},{light-40},{dark-20}',
        gaugeFillRatio: '15',
        lowerLimit: '0',
        upperLimit: '100',
        numberSuffix: '%',
        theme: 'fusion',
        gaugeOriginY: '230',
        showValue: '1',
        valueBelowPivot: '1',
        valueFontSize: '20',
        valueFontBold: '1',
        majorTMNumber: 7,
        minorTMNumber: 3,
        animation: 0,
      },
      colorRange: {
        color: [{
          minValue: '0',
          maxValue: '10',
          code: '#6baa01'
        }, {
          minValue: '10',
          maxValue: '80',
          code: '#FFCC22'
        }, {
          minValue: '80',
          maxValue: '100',
          code: '#e44a00'
        }]
      },
      dials: {
        dial: [{
          // bgColor: '#999999',
          // borderAlpha: '0',
          value: risk.toString()
        }]
      },
      trendpoints: {
        point: [{
          startValue: lower.toString(),
          endValue: upper !== 0 ? upper.toString() : lower.toString(),
          radius: 180,
          innerRadius: 5,
          displayValue: '藍色區塊-風險範圍',
          color: '#0075c2',
          alpha: 40
        }]
      },
      annotations: {
        origw: '450',
        origh: '300',
        autoscale: '1',
        showBelow: '1',
        groups: [{
          id: 'arcs',
          items: [{
            id: 'green-cs-bg',
            type: 'rectangle',
            x: '$chartCenterX-130',
            tox: '$chartCenterX-50',
            y: '$chartEndY - 35',
            toy: '$chartEndY - 15',
            fillcolor: '#6baa01'
          },
            {
              id: 'green-cs-text',
              type: 'Text',
              color: '#ffffff',
              label: '極度安全',
              fontSize: '12',
              align: 'center',
              x: '$chartCenterX - 90',
              y: '$chartEndY - 25'
            },
            {
              id: 'yellow-cs-bg',
              type: 'rectangle',
              x: '$chartCenterX-40',
              tox: '$chartCenterX+40',
              y: '$chartEndY - 35',
              toy: '$chartEndY - 15',
              fillcolor: '#f8bd19'
            },
            {
              id: 'yellow-cs-text',
              type: 'Text',
              color: '#ffffff',
              label: '正常範圍',
              fontSize: '12',
              align: 'center',
              x: '$chartCenterX',
              y: '$chartEndY - 25'
            },
            {
              id: 'red-cs-bg',
              type: 'rectangle',
              x: '$chartCenterX+50',
              tox: '$chartCenterX+130',
              y: '$chartEndY - 35',
              toy: '$chartEndY - 15',
              fillcolor: '#e44a00'
            },
            {
              id: 'red-cs-text',
              type: 'Text',
              color: '#ffffff',
              label: '值得注意',
              fontSize: '12',
              align: 'center',
              x: '$chartCenterX+90',
              y: '$chartEndY - 25'
            }
          ]
        }]
      }
    };
  }

}
